const express = require("express");
const router = express.Router();
const { router: routerTask } = require("./task");

router.use("/task", routerTask);

module.exports = { router };
