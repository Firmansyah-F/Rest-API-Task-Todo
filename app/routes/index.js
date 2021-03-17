const express = require("express");
const router = express.Router();
const { router: routerTask } = require("./task");
const { router: routerUser } = require("./user");

router.use("/task", routerTask);
router.use("/user", routerUser);

module.exports = { router };
