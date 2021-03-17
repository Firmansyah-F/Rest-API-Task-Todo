const express = require("express");
const router = express.Router();
const TaskController = require("./../controller/taskController");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/")
  .post(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.createTask
  )
  .get(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.getAllTask
  );

// router.route("/role").get(verifyJwt, TaskController.getIdTaskByRoleAssigne);
router
  .route("/:id")
  .put(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.updateTask
  )
  .delete([verifyJwt, permit("admin", "supervisor")], TaskController.deleteTask)
  .get(
    [verifyJwt, permit("admin", "user", "supervisor")],
    TaskController.getAllById
  );

module.exports = { router };
