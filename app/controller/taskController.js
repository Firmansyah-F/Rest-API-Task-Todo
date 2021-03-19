const { baseResponse } = require("../utils/helpers/baseResponse");
const { task, user } = require("./../db/models");
const main = require("./../utils/helpers/sendEmail");

class TaskController {
  static async createTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "supervisor") {
        const data = {
          userId: req.user.id,
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          status: "todo",
        };
        const createData = await task.create(data);
        if (createData) {
          const sendEmail = await user.findOne({
            where: { id: req.body.assignee },
          });
          // console.log(sendEmail.dataValues.email);
          main(sendEmail.dataValues.email)
          return baseResponse({
            message: "success create task",
            data: createData,
          })(res, 201);
        }
      } else {
        const data = {
          userId: req.body.userId,
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          status: "todo",
        };
        const createData = await task.create(data);
        return baseResponse({
          message: "success create task",
          data: createData,
        })(res, 201);
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "user") {
        const data = await task.findAll({
          where: {
            assignee: req.user.id,
          },
        });
        return baseResponse({ message: "Get All data", data: data })(res, 200);
      } else if (role == "supervisor") {
        const data = await task.findAll({
          where: {
            userId: req.user.id,
          },
        });
        return baseResponse({ message: "Get All data supervisor", data: data })(
          res,
          200
        );
      } else {
        const data = await task.findAll();
        return baseResponse({ message: "Get all data", data: data })(res, 200);
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getByIdTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "user") {
        const data = await task.findOne({
          where: {
            id: req.params.id,
            assignee: req.user.id,
          },
        });
        if (data) {
          return baseResponse({ message: "success get data", data: data })(
            res,
            200
          );
        }
      } else if (role == "supervisor") {
        const data = await task.findOne({
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
        if (data) {
          return baseResponse({ message: "success get data", data: data })(
            res,
            200
          );
        }
      } else {
        const data = await task.findByPk(req.params.id);
        if (data) {
          return baseResponse({ message: "success get data", data: data })(
            res,
            200
          );
        }
      }
      return baseResponse({ success: false, message: "data doesn't exist" });
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "supervisor") {
        const newData = {
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        };
        const data = await task.update(newData, {
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
        if (data[0]) {
          const databaru = await task.findByPk(req.params.id);

          return baseResponse({ message: "data updated", data: databaru })(
            res,
            200
          );
        }
        return baseResponse({ success: false, message: "data doesn't exist" })(
          res,
          200
        );
      } else {
        const newData = {
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        };
        const data = await task.update(newData, {
          where: {
            id: req.params.id,
          },
        });
        if (data[0]) {
          const databaru = await task.findByPk(req.params.id);
          return baseResponse({ message: "data updated", data: databaru })(
            res,
            200
          );
        }
        return baseResponse({ success: false, message: "data doesn't exist" })(
          res,
          200
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "supervisor") {
        const data = await task.destroy({
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
        if (data) {
          return baseResponse({ message: "data deleted", data: data })(
            res,
            200
          );
        }
        return baseResponse({ success: false, message: "data doesn't exist" })(
          res,
          200
        );
      } else {
        const data = await task.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (data) {
          return baseResponse({ message: "data deleted", data: data })(
            res,
            200
          );
        }
        return baseResponse({ success: false, message: "data doesn't exist" })(
          res,
          200
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updateTaskStatus(req, res, next) {
    try {
      const role = req.user.role;
      if (role == "user") {
        const newData = {
          status: req.body.status,
        };
        const data = await task.update(newData, {
          where: {
            id: req.params.id,
            assignee: req.user.id,
          },
        });
        if (data[0]) {
          const dataBaru = await task.findOne({
            where: {
              id: req.params.id,
              assignee: req.user.id,
            },
          });
          return baseResponse({
            message: "success updated status",
            data: dataBaru,
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "Data doesn't exist",
          })(res, 200);
        }
      } else if (role === "supervisor") {
        const newData = {
          status: req.body.status,
        };
        const data = await task.update(newData, {
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
        if (data[0]) {
          const dataBaru = await task.findOne({
            where: {
              id: req.params.id,
              userId: req.user.id,
            },
          });
          return baseResponse({
            message: "success updated status",
            data: dataBaru,
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "Data doesn't exist",
          })(res, 200);
        }
      } else {
        const newData = {
          status: req.body.status,
        };
        const data = await task.update(newData, {
          where: {
            id: req.params.id,
          },
        });
        if (data[0]) {
          const dataBaru = await task.findOne({
            where: {
              id: req.params.id,
            },
          });
          return baseResponse({
            message: "success updated status",
            data: dataBaru,
          })(res, 200);
        } else {
          return baseResponse({
            success: false,
            message: "Data doesn't exist",
          })(res, 200);
        }
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = TaskController;