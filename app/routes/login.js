const express = require("express");
const { validate } = require("./../utils/middleware/validate");
const router = express.Router();
const authController = require("./../controller/authController");
const { loginSchema } = require("./../utils/helpers/validationSchema");

router.post("/login", validate(loginSchema), authController.login);

module.exports = {
  router,
};