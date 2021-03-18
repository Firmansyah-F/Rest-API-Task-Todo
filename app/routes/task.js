const express = require("express");
const router = express.Router();
const TaskController = require("./../controller/taskController");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");
// const { updateStatus } = require("./../utils/helpers/validationSchema");
const { validateStatus,validateCreateTask } = require("./../utils/middleware/validate");

router
  .route("/")
  .post([verifyJwt, permit("admin", "supervisor"),validateCreateTask], TaskController.createTask)
  .get(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.getAllTask
  );

router
  .route("/:id")
  .delete([verifyJwt, permit("admin", "supervisor")], TaskController.deleteTask)
  .get(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.getByIdTask
  )
  .put([verifyJwt, permit("admin", "supervisor")], TaskController.updateTask);

router
  .route("/updateStatus/:id")
  .patch(
    [verifyJwt, permit("user", "supervisor", "admin"), validateStatus],
    TaskController.updateTaskStatus
  );

module.exports = { router };