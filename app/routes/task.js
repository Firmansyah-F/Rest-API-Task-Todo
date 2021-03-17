const express = require("express");
const router = express.Router();
const TaskController = require("./../controller/taskController");

router
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getAllTask);

module.exports = { router };
