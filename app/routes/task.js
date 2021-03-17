const express = require("express");
const router = express.Router();
const TaskController = require("./../controller/taskController");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/")
  .post(verifyJwt, TaskController.createTask)
  .get(verifyJwt,TaskController.getAllTask);

router.route("/role").get(verifyJwt, TaskController.getRole);

module.exports = { router };
