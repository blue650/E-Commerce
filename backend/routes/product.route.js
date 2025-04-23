import express from "express";
import { getAllProducts,getFeaturedProducts, createProduct, toggleFeaturedProduct, deleteProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", createProduct);
router.patch(":/id", protectRoute, toggleFeaturedProduct);
router.delete(":/id", protectRoute, deleteProduct);

export default router;
