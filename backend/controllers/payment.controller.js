import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import { v2 as cloudinary } from 'cloudinary';
import { redeemCoupon } from "./coupon.controller.js";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = await Promise.all(products.map(async (product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			const priceData = {
				currency: "usd",
				product_data: {
					name: product.name,
				},
				unit_amount: amount,
			};
			
			// Upload base64 image to Cloudinary and set the secure URL for Stripe
			if (product.image) {
				const uploadResult = await cloudinary.uploader.upload(product.image, {
					folder: "stripe_images",
				});
				priceData.product_data.images = [uploadResult.secure_url];
			}

			return {
				price_data: priceData,
				quantity: product.quantity || 1,
			};
		}));

		let discountPercentage = 0;
		if (couponCode) {
			try {
				const stripeCoupon = await stripe.coupons.retrieve(couponCode);
				if (!stripeCoupon.valid || (stripeCoupon.redeem_by && stripeCoupon.redeem_by < Math.floor(Date.now() / 1000))) {
					throw new Error("Invalid or expired coupon");
				}
				discountPercentage = stripeCoupon.percent_off ?? 0;
				totalAmount -= Math.round((totalAmount * discountPercentage) / 100);
			} catch (err) {
				console.warn("Coupon retrieval failed:", err.message);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: discountPercentage
				? [{ coupon: couponCode }]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		let giftCouponCode = null;
		if (totalAmount >= 20000) {
			const giftCoupon = await stripe.coupons.create({
				percent_off: 10,
				duration: "once",
				redeem_by: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
			});
			giftCouponCode = giftCoupon.id;
		}
		res.status(200).json({
			id: session.id,
			totalAmount: totalAmount / 100,
			url: session.url,
			giftCouponCode,
		});
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				// Redeem coupon using redeemCoupon controller (suppressed response)
				const fakeRes = {
					status: () => ({ json: () => {} }),
					json: () => {}
				};
				await redeemCoupon({ body: { code: session.metadata.couponCode } }, fakeRes);
			}

			// create a new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};