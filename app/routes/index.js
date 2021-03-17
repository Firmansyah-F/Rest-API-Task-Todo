const express = require("express");
const router = express.Router();
const { router: routerTask } = require("./task");
const { router: routerUser } = require("./user");
const { router: routerLogin } = require("./login");

router.use("/task", routerTask);
router.use("/user", routerUser);
router.use("/auth", routerLogin);

module.exports = { router };
