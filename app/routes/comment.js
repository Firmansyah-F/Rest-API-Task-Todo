const express = require("express");
const router = express.Router();
const CommentController = require("./../controller/commentControllers");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/:id")
  .post(
    [verifyJwt, permit("admin", "user", "supervisor")],
    CommentController.create
  )
  .put(
    [verifyJwt, permit("admin", "user", "supervisor")],
    CommentController.update
  )
  .delete(
    [verifyJwt, permit("admin", "supervisor", "user")],
    CommentController.delete
  );

router
  .route("/comment")
  .get(
    [verifyJwt, permit("admin", "supervisor", "user")],
    CommentController.getAll
  );

module.exports = { router };