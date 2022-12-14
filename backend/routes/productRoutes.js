import express from "express";
const router = express.Router();

import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTeamProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, auth } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(auth, admin, createProduct);
router.route("/:id/reviews").post(auth, createProductReview);
router.get("/top", getTopProducts);
router.get("/teams/:team", getTeamProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct);

export default router;
