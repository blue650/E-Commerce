import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        // Retrieve coupon by ID from Stripe
        const coupon = await stripe.coupons.retrieve(code);
        // If coupon doesn't exist or isn't valid, return null
        if (!coupon || !coupon.valid) {
            return res.json(null);
        }
        res.json(coupon);
    } catch (error) {
        // Handle not found errors separately
        if (error.statusCode === 404) {
            return res.json(null);
        }
        console.error("Error in getCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        // Retrieve coupon by ID from Stripe
        const coupon = await stripe.coupons.retrieve(code);
        // If coupon doesn't exist or isn't valid, return 404
        if (!coupon || !coupon.valid) {
            return res.status(404).json({ message: "Coupon not found or invalid" });
        }
        // Check for expiration if redeem_by is set
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (coupon.redeem_by && coupon.redeem_by < currentTimestamp) {
            return res.status(404).json({ message: "Coupon expired" });
        }
        // Return success with discount percentage
        res.json({
            message: "Coupon is valid",
            code: coupon.id,
            discountPercentage: coupon.percent_off ?? null,
        });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        console.error("Error in validateCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}; 