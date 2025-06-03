import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  uploadFiles,
} from "../controllers/authController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload } from "../middlewares/uploadFileMiddleware.mjs";

const router = express.Router();

// Authentication
//user register route (public)
router.post("/register", registerUser);

// user login route (public)
router.post("/login", loginUser);

// get user profile route
router.get("/profile", protect, getUserProfile);

// edit user profile route
router.put("/profile", protect, editUserProfile);

// upload profile image route
router.post("/upload-img", upload.single("image"), uploadFiles);

export default router;
