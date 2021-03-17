const express = require("express");
const router = express.Router();
const UserController = require("./../controller/userController");
const { verifyJw, permit } = require("./../utils/middleware/authJwt");

router
  .route("/")
  .post(UserController.createUser)
  .get(UserController.getAllUser);

module.exports = { router };
