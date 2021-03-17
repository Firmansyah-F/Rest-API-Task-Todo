const express = require("express");
const router = express.Router();
const { router: routerTask } = require("./task");
const { router: routerComment} = require("./comment")

router.use("/task", routerTask);
router.use("/comment", routerComment)

module.exports = { router };
