const ToDo = require("../models/todoModel");
const asyncWrapper = require('../middlewares/asyncWrapper')
const HTTP_STATUS_CODES = require("../middlewares/utils/statusCodes");

const createToDo = asyncWrapper(async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const todo = new ToDo({ title, description, status });
    const saveTask = await todo.save();
    res.status(HTTP_STATUS_CODES.CREATED).json({ saveTask });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json({ message: "A todo with this title already exists." });
      return;
    }
    console.error("Error creating todo:", error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while creating the todo." });
  }
});

const getToDo = asyncWrapper(async (req, res) => {
  const todos = await ToDo.find({}).sort({ createdAt: -1 });

  if (!todos) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
  }
  console.log("Got todos", todos)
  res.status(HTTP_STATUS_CODES.OK).json({ todos });
});

const getSingleToDo = asyncWrapper(async (req, res) => {
  const todosId = req.params.id;
  const todo = await ToDo.findById(todosId);

  if (!todo) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
  }
  console.log("Got todos", todo)
  res.status(HTTP_STATUS_CODES.OK).json({ todo });
});

// Put request
const updateToDo = asyncWrapper(async (req, res) => {
  const todosId = req.params.id;
  const { title, description, status } = req.body;

  try {
    // Check if a todo with the same title already exists (but not the current todo)
    const existingToDo = await ToDo.findOne({ title });
    if (existingToDo && existingToDo._id.toString() !== todosId) {
      return res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json({ message: "A todo with this title already exists." });
    }

    const todo = await ToDo.findByIdAndUpdate(
      todosId,
      { title, description, status },
      { new: true }
    );

    if (!todo) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
    }

    res.status(HTTP_STATUS_CODES.OK).json({ todo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while updating the todo." });
  }
});


const deleteToDo = asyncWrapper(async (req, res) => {
  const todosId = req.params.id;
  try {
    const todo = await ToDo.findByIdAndDelete(todosId);
    if (!todo) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({});
    }
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: `Deleted todo with ${todosId} id` });
  } catch (error) {
    console.log("Error occured", error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error });
  }
});

module.exports = {
  createToDo,
  getToDo,
  getSingleToDo,
  updateToDo,
  deleteToDo,
};
