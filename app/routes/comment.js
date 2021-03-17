const express = require("express");
const router = express.Router();
const CommentController = require("./../controller/commentControllers");

router
  .route('/')
  .post(function(req, res){CommentController.createComment})
  .get(CommentController.getAll);

router
  .route("/:id")
  .get(CommentController.getById)
  .put(CommentController.update)
  .delete(CommentController.delete)

module.exports = {router}
