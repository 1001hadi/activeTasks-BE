import User from "../models/User.mjs";
import Task from "../models/Task.mjs";
import bcrypt from "bcryptjs";

// @desc   get all user (by admin)
// @route  get /api/users
// @access privet(admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    // add users task count
    const usersTasksCount = await Promise.all(
      users.map(async (user) => {
        const pendingTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const progressTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Progress",
        });
        const completedTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });
        // _doc comes from stack overflow help
        return { ...user._doc, pendingTask, progressTask, completedTask };
      })
    );
    res.json(usersTasksCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   get specific user
// @route  get /api/users/:id
// @access privet
export const getSpecificUser = (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   delete  user (by admin)
// @route  get /api/users/:id
// @access privet(admin only)
export const removeUser = (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};
