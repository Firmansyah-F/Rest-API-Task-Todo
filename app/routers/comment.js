
const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentControllers");
// const { verifikasiJwt, permit } = require("../utils/middleware/authjwt");
// const { validateResource } = require('../utils/middleware/validator')
// const { typeSchema } = require("../utils/helpers/validation");

router
  .route("./")
  .get(CommentController.getAll)
  .post(CommentController.create);

router
  .route("./:id")
  .put(CommentController.update)
  .delete(CommentController.delete);
