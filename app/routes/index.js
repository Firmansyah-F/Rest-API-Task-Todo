const express = require("express");
const router = express.Router();
const { router: routerTask } = require("./task");
const { router: routerUser } = require("./user");
const { router: routerLogin } = require("./login");
const { router: routerComment} = require("./comment")

router.use("/task", routerTask);
router.use("/user", routerUser);
router.use("/auth", routerLogin);
router.use("/comment", routerComment)

module.exports = { router };
