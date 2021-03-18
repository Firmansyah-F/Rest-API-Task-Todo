const express = require("express");
const router = express.Router();
const UserController = require("./../controller/userController");
const { verifyJwt , permit } = require("./../utils/middleware/authJwt");

router
  .route("/")
  .post(UserController.createUser)
  .get(verifyJwt, permit("admin","supervisor"), UserController.getAllUser);

module.exports = { router };
