import User from "../models/User.mjs";
import Task from "../models/Task.mjs";
// import bcrypt from "bcryptjs";

// @desc   get all user (by admin)
// @route  get /api/users
// @access privet(admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    // add users task count
    // help from stack overflow help
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
        const completeTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Complete",
        });

        return { ...user._doc, pendingTask, progressTask, completeTask };
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
export const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "user not existed!" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   delete  user (by admin)
// @route  get /api/users/:id
// @access privet(admin only)
export const removeUser = async (req, res) => {
  try {
    const removedUser = await User.findByIdAndDelete(req.params.id);

    if (!removedUser) {
      return res.status(404).json({ msg: "user not existed!" });
    }

    res.json(removedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};
