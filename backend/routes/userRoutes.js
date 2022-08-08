import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, auth } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(auth, admin, getUsers);
router.post("/login", authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser);

export default router;
