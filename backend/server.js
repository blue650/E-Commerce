import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

/* seedInitialProducts()
 * Ensures required starter data exists in MongoDB.
 * This is idempotent: it won't insert duplicates on restart.
 */
async function seedInitialProducts() {
	// Define the exact document you requested to insert into `db.products`.
	const seedProduct = {
		name: "Blue collar business Guide",
		description: "A practical guide for starting and growing a blue collar business",
		price: 1.99,
		image: "https://www.bluecollarbizguide.com/logo.jpg",
		category: "business",
		isFeatured: true,
	};

	// Only insert if it doesn't already exist (by unique-ish key: name).
	const existing = await Product.findOne({ name: seedProduct.name });
	if (!existing) {
		// Equivalent to: db.products.insertOne({...})
		await Product.create(seedProduct);
		console.log(`Seeded product into ecommerce.products: ${seedProduct.name}`);
	} else {
		// Keep startup safe and repeatable.
		console.log(`Seed skipped (already exists): ${seedProduct.name}`);
	}
}

/* startServer()
 * Connects to MongoDB (ecommerce DB), seeds startup data, then starts Express.
 */
async function startServer() {
	// Connect first so routes don't run before DB is ready.
	await connectDB();

	// Seed the requested product into `ecommerce.products`.
	await seedInitialProducts();

	// Start listening after DB + seed completes.
	app.listen(PORT, () => {
		console.log("Server is running on http://localhost:" + PORT);
	});
}

// Boot the server (and fail fast if startup steps throw).
startServer();
