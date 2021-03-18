const { baseResponse } = require("../utils/helpers/baseResponse");
const { comment, user, task } = require("./../db/models");

class CommentController {
  static async create(req, res, next) {
    try {
      const role = req.user.role;
      if (role == "user") {
        const dataTask = await task.findOne({
          where: { id: req.params.id, assignee: req.user.id },
        });

        if (dataTask) {
          const dataUser = {
            taskId: dataTask.dataValues.id,
            userId: dataTask.dataValues.assignee,
          };

          const createCommentUser = await comment.create({
            taskId: dataUser.taskId,
            userId: dataUser.userId,
            comment: req.body.comment,
          });
          return baseResponse({
            success: true,
            message: "create new comment",
            data: createCommentUser,
          })(res, 201);
        } else {
          return baseResponse({
            success: true,
            message: "Data doesn't exist",
            data: [],
          })(res, 400);
        }
      } else if (role == "supervisor") {
        const dataTask = await task.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (dataTask) {
          const dataSupervisor = {
            taskId: dataTask.dataValues.id,
            userId: dataTask.dataValues.userId,
          };

          const createCommentSvr = await comment.create({
            taskId: dataSupervisor.taskId,
            userId: dataSupervisor.userId,
            comment: req.body.comment,
          });
          return baseResponse({
            success: true,
            message: "create new comment",
            data: createCommentSvr,
          })(res, 201);
        } else {
          return baseResponse({
            success: true,
            message: "Data doesn't exist",
          })(res, 400);
        }
      } else {
        const createComment = await comment.create({
          userId: req.body.userId,
          taskId: req.body.taskId,
          comment: req.body.comment,
        });

        return baseResponse({
          success: true,
          message: "create new comment",
          data: createComment,
        })(res, 201);
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "user" || role === "supervisor") {
        const getCommentUser = await comment.findAll({
          where: {
            userId: req.user.id,
          },
        });
        return baseResponse({
          success: true,
          message: "get all comment",
          data: getCommentUser,
        })(res, 201);
      } else {
        const getComment = await comment.findAll();
        return baseResponse({
          success: true,
          message: "get all comment",
          data: getComment,
        })(res);
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const role = req.user.role;
      if (role === "user" || role === "supervisor") {
        const deleteComment = await comment.destroy({
          where: {
            id: req.params.id,
            userId: req.user.id,
          },
        });
        if (deleteComment) {
          return baseResponse({ message: "success delete" })(res, 202);
        } else {
          return res.status(404).json({
            succes: false,
            message: "comment doesn't exist",
          });
        }
      } else if (role === "admin") {
        const deleteComment = await comment.destroy({
          where: {
            id: req.params.id,
          },
        });
        // console.log(deleteComment)
        if (deleteComment) {
          return baseResponse({
            message: "success delete",
            data: deleteComment,
          })(res, 202);
        } else {
          return res.status(404).json({
            succes: false,
            message: "comment tidak ditemukan",
            data: [],
          });
        }
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      // const role = req.user.role
      // if (role === "user" || role === "supervisor") {

      // }
      const newData = {
        comment: req.body.comment,
      };

      const data = await comment.update(newData, {
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (data[0]) {
        const dataBaru = await comment.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        return baseResponse({ message: "success", data: dataBaru })(res, 200);
      }
      return baseResponse({ success: false, message: "data doesn't exist" })(
        res,
        202
      );
      // console.log(data);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  // static async update(req, res, next) {
  //   try {
  //     const role = req.user.role;
  //     if (role === "user") {
  //       const commentUpdate = await comment.findOne({
  //         where: {
  //           id: req.params.id,
  //           userId: req.user.id,
  //         },
  //       });
  //       if (commentUpdate) {
  //         const newComment = {
  //           comment: req.body.comment,
  //         };
  //         const data = await comment.update(newComment, {
  //           where: {
  //             id: req.params.id,
  //             userId: req.user.id,
  //           },
  //         });
  //         if (data[0]) {
  //           const dataBaru = await comment.findOne({
  //             where: {
  //               id: req.params.id,
  //               userId: req.user.id,
  //             },
  //           });
  //           return baseResponse({ message: "success updated", data: dataBaru })(
  //             res,
  //             200
  //           );
  //         }
  //       } else {
  //         return baseResponse({
  //           success: false,
  //           message: "data doens't exist ",
  //         })(res, 200);
  //       }
  //     } else if (role === "supervisor") {
  //       const commentUpdate = await comment.findOne({
  //         where: {
  //           id: req.params.id,
  //           userId: req.user.id,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
module.exports = CommentController;
