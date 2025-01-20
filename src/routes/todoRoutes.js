const {
  createToDo,
  getToDo,
  getSingleToDo,
  updateToDo,
  deleteToDo,
} = require("../controllers/todoController");

const express = require("express");
const router = express.Router();

router.route("/todos").post(createToDo).get(getToDo);
router
  .route("/todos/:id")
  .get(getSingleToDo)
  .put(updateToDo)
  .delete(deleteToDo);
module.exports = router;