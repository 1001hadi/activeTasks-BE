import Task from "../models/Task.mjs";
import mongoose from "mongoose";

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
    const { status } = req.query;
    let filteredTasks = {};

    // If status exists, add it to filteredTasks.
    if (status) {
      filteredTasks.status = status;
    }

    // display all task only for admin,
    // display assigned task by id fro users
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filteredTasks).populate(
        "assignedTo",
        "name email profileImage"
      );
    } else {
      tasks = await Task.find({
        ...filteredTasks,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImage");
    }

    // add completed checklist
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.checklist.filter(
          (item) => item.completed
        ).length;
        return { ...task.toObject(), completedChecklistCount: completedCount };
      })
    );

    // status counts summary
    // base query to use in all tasks variables
    const baseQuery =
      req.user.role === "admin" ? {} : { assignedTo: req.user._id };

    const allTasks = await Task.countDocuments(baseQuery);

    const pendingTasks = await Task.countDocuments({
      ...filteredTasks,
      status: "Pending",
      ...baseQuery,
    });

    const inProgressTasks = await Task.countDocuments({
      ...filteredTasks,
      status: "Progress",
      ...baseQuery,
    });

    const completedTasks = await Task.countDocuments({
      ...filteredTasks,
      status: "Complete",
      ...baseQuery,
    });

    res.json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// @desc   get specific task
// @route  get /api/tasks/:id
// @access privet
export const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImage"
    );

    if (!task) return res.status(404).json({ msg: "task not exist!" });

    res.json(task);
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
    const taskToEdit = await Task.findByIdAndUpdate(req.params.id, {
      new: true,
    });

    if (!taskToEdit) return res.status(404).json({ msg: "task not exist!" });

    // assign what can be Edit
    taskToEdit.title = req.body.title || taskToEdit.title;
    taskToEdit.description = req.body.description || taskToEdit.description;
    taskToEdit.priority = req.body.priority || taskToEdit.priority;
    taskToEdit.dueDate = req.body.dueDate || taskToEdit.dueDate;
    taskToEdit.checklist = req.body.checklist || taskToEdit.checklist;
    taskToEdit.attachments = req.body.attachments || taskToEdit.attachments;

    // make sure the assignTo be an array
    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ msg: "assignedTo must be array of users id" });
      }
      taskToEdit.assignedTo = req.body.assignedTo;
    }

    const editedTask = await taskToEdit.save();

    res.status(200).json("task updated!", editedTask);
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
    const taskToRemove = await Task.findByIdAndDelete(req.params.id);

    if (!taskToRemove) return res.status(404).json({ msg: "task not exist!" });

    await taskToRemove.deleteOne();
    res.json({ msg: "task has been removed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// @desc   edit task status
// @route  put /api/:id/status
// @access privet
export const editTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "task not exist!" });

    // check if task assigned to the user who wants edit task status
    const assignedTask = task.assignedTo.some(
      (userId) => userId === req.user._id
    );

    if (!assignedTask && req.user.role !== "admin") {
      return res.status(404).json({ msg: "you are not authorized to edit" });
    }

    task.status = req.body.status || task.status;

    // after task completed progress = to 100
    if (task.status === "Complete") {
      task.checklist.forEach((box) => (box.completed = true));
      task.progress = 100;
    }

    await task.save();

    res.status(200).json({ msg: "task status edited!", task });
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
    const { checklist } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "task not exist!" });

    // check if task is assigned to user, if not checkbox cant be edited.
    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res.status(404).json({ msg: "can't edit checklist!" });
    }

    // replacing with edited checklist
    task.checklist = checklist;

    // edit progress based on checklist mark
    const completedCount = task.checklist.filter((box) => box.completed).length;
    const totalBoxes = task.checklist.length;
    task.progress =
      totalBoxes > 0 ? Math.round((completedCount / totalBoxes) * 100) : 0;

    // show complete if all boxes checked
    task.status =
      task.progress === 100
        ? "Complete"
        : task.progress > 0
        ? "Progress"
        : "Pending";

    await task.save();

    const editedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImage"
    );

    res.status(200).json({ msg: "checklist edited!", task: editedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// @desc   get admin dashboard
// @route  get /api/main-dashboard
// @access privet (admin)
export const getMainDashboard = async (req, res) => {
  try {
    // fetch status
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Complete" });
    const overDueTasks = await Task.countDocuments({
      status: { $ne: "Complete" },
      dueDate: { $lt: new Date() },
    });

    // including all status
    // got hint from stack overFlow in this section
    const allTaskStatus = ["Pending", "Progress", "Complete"];
    const taskPercentageRow = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const taskPercentage = allTaskStatus.reduce((acc, status) => {
      // remove spaces from res keys
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskPercentageRow.find((task) => task._id === status)?.count || 0;
      return acc;
    }, {});
    // add total to taskPercentage
    taskPercentage["All"] = totalTasks;

    // add all priority level
    // got hint from stack overFlow in this section
    const allTaskPriority = ["Low", "Medium", "High"];
    const taskPriorityLevelsRow = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);
    const taskPriorityLevels = allTaskPriority.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRow.find((task) => task._id === priority)?.count || 0;
      return acc;
    }, {});

    //get recent tasks
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status priority dueDate, createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskPercentage,
        taskPriorityLevels,
      },
      recentTasks,
    });
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
