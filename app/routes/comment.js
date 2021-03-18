const express = require("express");
const router = express.Router();
const CommentController = require("./../controller/commentControllers");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");


router
  .route("/:id")
  .post([verifyJwt, permit("admin", "user", "supervisor")],CommentController.create)
  .get([verifyJwt, permit("admin","supervisor")],CommentController.getAll)
  // .put([verifyJwt, permit("admin", "user", "supervisor")],CommentController.update)
  .delete([verifyJwt, permit("admin", "supervisor")], CommentController.delete)


module.exports = {router}

