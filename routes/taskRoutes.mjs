import express from "express";
import { adminAuth, protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// main dashboard data route
router.get("/main-dashboard", protect, getMainDashboard);
// user dashboard data route
router.get("user-dashboard", protect, getUserDashboard);
// create task route
router.post("/", protect, adminAuth, createTask);
// get all tasks route
router.get("/", protect, getAllTasks);
// get specific task route
router.get("/:id", protect, getSingleTask);
// edit task route
router.put("", protect, editTask);
// remove task route
router.delete("", protect, adminAuth, removeTask);
// edit task status
router.get("", protect, editTaskStatus);
// edit task checklist
router.get("", protect, editTaskChecklist);

export default router;
