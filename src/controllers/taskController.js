const Task = require("../models/taskModel");
const asyncWrapper = require('../middlewares/asyncWrapper')
const HTTP_STATUS_CODES = require("../middlewares/utils/statusCodes");

const createTask = asyncWrapper(async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({ title, description, status });
    const saveTask = await task.save();
    res.status(HTTP_STATUS_CODES.CREATED).json({ saveTask });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json({ message: "A task with this title already exists." });
      return;
    }
    console.error("Error creating task:", error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the task." });
  }
});

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  if (!tasks) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
  }
  console.log("Got tasks", tasks)
  res.status(HTTP_STATUS_CODES.OK).json({ tasks });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const tasksId = req.params.id;
  const task = await Task.findById(tasksId);

  if (!task) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
  }
  console.log("Got tasks", task)
  res.status(HTTP_STATUS_CODES.OK).json({ task });
});

// Put request
const updateTask = asyncWrapper(async (req, res) => {
  const tasksId = req.params.id;
  const { title, description, status } = req.body;

  try {
    // Check if a task with the same title already exists (but not the current task)
    const existingTask = await Task.findOne({ title });
    if (existingTask && existingTask._id.toString() !== tasksId) {
      return res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json({ message: "A task with this title already exists." });
    }

    const task = await Task.findByIdAndUpdate(
      tasksId,
      { title, description, status },
      { new: true }
    );

    if (!task) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
    }

    res.status(HTTP_STATUS_CODES.OK).json({ task });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while updating the task." });
  }
});


const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
    }
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: `Deleted task with ${taskId} id` });
  } catch (error) {
    console.log("Error occured", error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error });
  }
});

module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
