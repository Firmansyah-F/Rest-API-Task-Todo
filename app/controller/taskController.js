const { baseResponse } = require("../utils/helper/baseResponse");
const { task } = require("./../db/models");

class TaskController {
  static async createTask(req, res, next) {
    try {
      const data = {
        userId: req.body.userId,
        assignee: req.body.assignee,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: "todo",
        attachment: req.body.attachment,
      };
      const createData = await task.create(data);
      return baseResponse({ message: "success create task", data: createData })(
        res,
        201
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllTask(req, res, next) {
    //   if req.user == role? baru di arahkan sesuai dengan role
    try {
      const data = await task.findAll();
      return baseResponse({ message: "Get All data", data: data })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = TaskController;
