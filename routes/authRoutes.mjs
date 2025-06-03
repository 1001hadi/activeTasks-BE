import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  editUserProfile,
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
router.post("/upload-img", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "file not uploaded!" });
  }
  // got this from my older project
  const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imgUrl });
});

export default router;
