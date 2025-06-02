import express from "express";

const router = express.Router();

// Authentication
//user register route
router.post("/ register", registerUser);
// user login route
router.post("/login", loginUser);
// get user profile route
router.get("/profile", protect, getUserProfile);
// edit user profile route
router.put("/profile", protect, editUserProfile);

export default router;
