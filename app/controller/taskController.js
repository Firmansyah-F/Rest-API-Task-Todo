const { baseResponse } = require("../utils/helpers/baseResponse");
const { task } = require("./../db/models");

class TaskController {
  static async createTask(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "user") {
        const data = {
          userId: req.user.id,
          assignee: req.user.id,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          status: "todo",
          attachment: req.body.attachment,
        };
        const createData = await task.create(data);
        return baseResponse({
          message: "success create task role user",
          data: createData,
        })(res, 201);
      } else if (role === "admin" || role === "supervisor") {
        const data = {
          userId: req.user.id,
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          status: "todo",
          attachment: req.body.attachment,
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
    //   if req.user == role? baru di arahkan sesuai dengan role
    // jika rolenya user dia hanya bisa get punya dirinya sendiri
    // Jika dia admin dan supervisor dia bisa liat smeuanya
    try {
      const role = req.user.role;
      if (role === "user") {
        const data = await task.findAll({
          where: {
            assignee: req.user.id,
          },
        });
        return baseResponse({ message: "Get All data", data: data })(res, 200);
      } else {
        const data = await task.findAll();
        return baseResponse({ message: "Get All data", data: data })(res, 200);
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllById(req, res, next) {
    //   if req.user == role? baru di arahkan sesuai dengan role
    // jika rolenya user dia hanya bisa get punya dirinya sendiri
    // Jika dia admin dan supervisor dia bisa liat smeuanya
    // Kenapa tidak pake findByPk karena untuk melindungi data admin
    // dan supervisor
    // findOne Where role:admin,supervisor,user
    try {
      const role = req.user.role;
      if (role === "user") {
        const data = await task.findOne({
          where: {
            assignee: req.params.id,
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
      if (role === "user") {
        // const data = await task.findAll({ where: { assignee: req.user.id } });
        const dataUpdate = await task.findAll({
          where: { assignee: req.user.id },
        });
        const dataFilter = dataUpdate.filter((e) => {
          return e.dataValues === req.params.id;
        });
        if (dataFilter.length === 0) {
          return baseResponse({
            success: false,
            message: "Data with your role is not available",
          })(res, 200);
        } else {
          const newData = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status,
            attachment: req.body.attachment,
          };
          const data = await task.update(newData, {
            where: {
              assignee: req.user.id,
            },
          });
          if (data[0]) {
            const databaru = await task.findByPk(req.params.id);
            return baseResponse({ message: "data updated", data: databaru })(
              res,
              200
            );
          }
          return baseResponse({
            success: false,
            message: "data doesn't exist",
          })(res, 200);
        }
      } else {
        const newData = {
          assignee: req.body.assignee,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
          status: req.body.status,
          attachment: req.body.attachment,
        };
        const data = await task.update(newData, {
          where: {
            id: req.body.id,
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
      const data = await task.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        return baseResponse({ message: "data deleted", data: data })(res, 200);
      }
      return baseResponse({ success: false, message: "data doesn't exist" })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  // fetch
  static async updateTaskStatus(req, res, next){
    try {
      const role = req.user.role
      if (role == "user") {
        const dataUpdate = await task.findAll({
          where: { assignee: req.user.id },
        });
        const dataFilter = dataUpdate.filter((e) => {
          return e.dataValues === req.params.id;
        });
        if (dataFilter.length === 0) {
          return baseResponse({
            success: false,
            message: "Data with your role is not available",
          })(res, 200);
        } else {
          const newData = {
            status: req.body.status,
          };
          const data = await task.update(newData, {
            where: {
              assignee: req.user.id,
            },
          });
          if (data[0]) {
            const databaru = await task.findByPk(req.params.id);
            return baseResponse({ message: "data updated", data: databaru })(
              res,
              200
            );
          }
          return baseResponse({
            success: false,
            message: "data doesn't exist",
          })(res, 200);
        }
      }
    } catch (error) {
      res.status(500);
      next(error)
    }
  }

  // static async getRole(req, res, next) {
  //   try {
  //     const role = req.user.role;
  //     if (role === "user") {
  //       const data = {
  //         userId: req.user.id,
  //         assignee: req.user.id,
  //         title: req.body.title,
  //         description: req.body.description,
  //         dueDate: req.body.dueDate,
  //         status: "todo",
  //         attachment: req.body.attachment,
  //       };
  //       return baseResponse({ message: "asdasdsad", data: data })(res, 200);
  //     }
  //     // if (role==="admin") {
  //     //   return baseResponse({ message: "success ini admin", data: role })(res, 200)
  //     // }
  //     // return baseResponse({ message: "success ini bukan", data: role })(res, 200)
  //   } catch (error) {
  //     res.status(500);
  //     next(error);
  //   }
  // }

  // static async getIdTaskByRoleAssigne(req, res, next) {
  //   const role = req.user.role;
  //   if (role == "user") {
  //     const data = await task.findAll({ where: { assignee: req.user.id } });
  //     const dataMap = data.filter((e) => {
  //       return e.dataValues.id === 2;
  //     });

  //     // return baseResponse({ message: "successssss", data:dataMap });
  //     console.log(dataMap.length);
  //     if (dataMap.length === 0) {
  //       console.log("Data kosong");
  //     } else {
  //       console.log("Data TIDAKKK kosong");
  //     }
  //     return baseResponse({ message: "success", data: dataMap })(res, 200);
  //   }
  // }
}

module.exports = TaskController;
