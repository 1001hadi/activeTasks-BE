import Task from "../models/Task.mjs";

// @desc   get all tasks (admin, user)
// @route  get /api/tasks
// @access privet
export const getAllTasks = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};
