const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const express = require("express");
const router = express.Router();

router.route("/tasks").post(createTask).get(getTasks);
router
  .route("/tasks/:id")
  .get(getSingleTask)
  .put(updateTask)
  .delete(deleteTask);
module.exports = router;