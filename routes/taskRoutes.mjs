import express from "express";
import { adminAuth, protect } from "../middlewares/authMiddleware.mjs";
import {
  createTask,
  editTask,
  editTaskChecklist,
  editTaskStatus,
  getAllTasks,
  getMainDashboard,
  getSingleTask,
  getUserDashboard,
  removeTask,
} from "../controllers/taskController.mjs";

const router = express.Router();

// create task route
router.post("/", protect, adminAuth, createTask);
// get all tasks route
router.get("/", protect, getAllTasks);
// get specific task route
router.get("/:id", protect, getSingleTask);
// edit task route
router.put("/:id", protect, editTask);
// remove task route
router.delete("/:id", protect, adminAuth, removeTask);
// edit task status
router.put("/:id/status", protect, editTaskStatus);
// edit task checklist
router.put("/:id/checklist", protect, editTaskChecklist);
// main dashboard data route
router.get("/main-dashboard", protect, getMainDashboard);
// user dashboard data route
router.get("user-dashboard", protect, getUserDashboard);

export default router;
