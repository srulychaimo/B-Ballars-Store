import express from "express";
import {
  passwordResetRequest,
  resetUserPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/", passwordResetRequest);
router.post("/:userId/:token", resetUserPassword);

export default router;
