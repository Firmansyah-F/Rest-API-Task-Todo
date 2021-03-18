const express = require("express");
const router = express.Router();
const UserController = require("./../controller/userController");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/")
  .post(verifyJwt, permit("admin","user","supervisor"), UserController.createUser)
  .get(verifyJwt, permit("admin"), UserController.getAllUser);

module.exports = { router };
