const { baseResponse } = require("../utils/helpers/baseResponse");
const { user } = require("./../db/models");
const { hashing } = require("./../utils/helpers/hashPassword");


class UserController {
  static async createUser(req, res, next) {
    try {
      const dataEmail = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (dataEmail) {
        return baseResponse({
          success: false,
          message: "Email must be unique",
        })(res, 200);
      }

      const { salt, hash } = hashing(req.body.password);
      const data = await user.create({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hash,
        salt: salt,
      });
      return baseResponse({
        message: "success created user",
        data: {
          username: data.dataValues.username,
          email: data.dataValues.email,
          role: data.dataValues.role,
        },
      })(res, 201);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const data = await user.findAll({
        attributes: ["id", "username", "email", "role"],
      });
      return baseResponse({ message: "success get all data", data: data })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  // static async updateUser(req, res, next) {
  //   try {
  //     const { salt, hash } = hasing(req.body.password);
  //     const newData = {
  //       username: req.body.username,
  //       email: req.body.email,
  //       role: req.body.role,
  //       password: hash,
  //       salt: salt,
  //     };
  //     const dataUpdate = await user.update(newData, {
  //       where: { id: req.params.id },
  //     });

  //     if (dataUpdate[0]) {
  //       const dataUpdated = await user.findByPk(req.params.id);
  //       return baseResponse({
  //         message: "success updated data",
  //         data: dataUpdated,
  //       })(res, 200);
  //     }
  //     return baseResponse({
  //       success: false,
  //       message: "data doesn't exist",
  //       data: dataUpdated,
  //     })(res, 200);
  //   } catch (error) {
  //     res.status(500);
  //     next(error);
  //   }
  // }

  // static async deleteUser(req, res, next) {
  //   try {
  //     const data = await user.destroy({ where: { id: req.params.id } });
  //     if (data) {
  //       return baseResponse({ message: "data deleted", data: data })(res, 200);
  //     }
  //     return baseResponse({ success: false, message: "data doesn't exist" })(
  //       res,
  //       200
  //     );
  //   } catch (error) {
  //     res.status(500);
  //     next(error);
  //   }
  // }
}
module.exports = UserController;
