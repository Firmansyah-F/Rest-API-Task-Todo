const { router : routerComment } = require("./comment");
const express = require ('express')
const router = express.Router()

router.use("/comments", routerComment )

module.exports = { router }