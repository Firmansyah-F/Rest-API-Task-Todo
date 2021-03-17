const express = require("express");
const { validate } = require("./../utils/middlewares/validate");
const router = express.Router();
const authController = require("./../controller/authController");
const { loginSchema, userSchema } = require("./../utils/helpers/validationSchema");

router.post("/register", validate(userSchema), authController.register);

module.exports = {
  router,
};