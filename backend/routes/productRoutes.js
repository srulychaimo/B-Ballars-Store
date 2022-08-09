import express from "express";
const router = express.Router();

import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { admin, auth } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);

router.route("/:id").get(getProductById).delete(auth, admin, deleteProduct);

export default router;
