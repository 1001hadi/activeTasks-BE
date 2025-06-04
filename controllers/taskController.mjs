import Task from "../models/Task.mjs";

// @desc   create new task (admin)
// @route  post /api/tasks
// @access privet
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      checklist,
      attachments,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ msg: "assignedTo must be array of users id" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      checklist,
      attachments,
    });

    res.status(201).json({ msg: "task created!", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

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

// @desc   get specific task
// @route  get /api/tasks/:id
// @access privet
export const getSingleTask = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   edit task (admin)
// @route  put /api/tasks/:id
// @access privet
export const editTask = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   remove task (admin)
// @route  delete /api/tasks/:id
// @access privet
export const removeTask = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   edit task status
// @route  put /api/:id/status
// @access privet
export const editTaskStatus = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   edit task checklist
// @route  put /api/:id/checklist
// @access privet
export const editTaskChecklist = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   get admin dashboard
// @route  get /api/main-dashboard
// @access privet (admin)
export const getMainDashboard = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   get user dashboard
// @route  get /api/user-dashboard
// @access privet
export const getUserDashboard = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};
