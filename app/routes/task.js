const express = require("express");
const router = express.Router();
const TaskController = require("./../controller/taskController");
const {verifyJw, permit}= require("./../utils/middleware/authJwt")

router
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getAllTask);

module.exports = { router };
