import express from "express";
import { adminAuth, protect } from "../middlewares/authMiddleware.mjs";
import {
  getSpecificUser,
  getUsers,
  removeUser,
} from "../controllers/userController.mjs";

const router = express.Router();

// get all users, only admin allowed
router.get("/", protect, adminAuth, getUsers);

// get specific user by id
router.get("/:id", protect, getSpecificUser);

// delete user, only admin allowed
router.delete("/:id", protect, adminAuth, removeUser);

export default router;
