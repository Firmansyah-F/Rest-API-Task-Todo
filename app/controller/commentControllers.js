const { baseResponse } = require("../utils/helpers/baseResponse");
const { comment, user, task } = require("./../db/models");

class CommentController {
  static async create(req, res, next) {
    try {
      if (user.role == "user") {
        
        const dataTask = await task.findOne({
          where : { id : req.params.id, assignee: req.user.id }
        })
        const dataUser = {
          taskId: dataTask.dataValues.id,
          userId: dataTask.dataValues.assignee}
        
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

      } else if (user.role == "supervisor") {

        const dataTask = await task.findOne({
          where : { id : req.params.id, userId: req.user.id }
        })

        const dataSupervisor = {
          taskId: dataTask.dataValues.id,
          userId: dataTask.dataValues.userId}

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
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {

      if (user.role == "user"|| user.role == "supervisor") {
        const getCommentUser = await comment.findAll({
          where : {
            where : { id : req.params.id, userId: req.user.id }
          }
        });
        return baseResponse({
          success: true,
          message: "create new comment",
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

      if (user.role == "user"|| user.role == "supervisor") {
        const deleteComment = await comment.destroy({
          where : {
            where : { id : req.params.id, userId: req.user.id }
          }
        });
        if (deleteComment) {
          return res.status(204).json();
        }
        return res.status(404).json({
          succes: false,
          message: "comment tidak ditemukan",
          data: [],
        });

      } else {
        const deleteComment = await comment.destroy({
          where : {
            where : { id : req.params.id }
          }
        });
        if (deleteComment) {
          return res.status(204).json();
        }
        return res.status(404).json({
          succes: false,
          message: "comment tidak ditemukan",
          data: [],
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // static async update(req, res, next) {
  //   try {
  //     const userGet = await task.findOne({
  //       where: {
  //         where : { id : req.params.id, userId: req.user.id }
  //       },
  //     });
  //     const newComment = {
  //       userId: req.body.userId,
  //       taskId: req.body.taskId,
  //       comment: req.body.comment,
  //     };
  //     const commentUpdate = await comment.update(newComment, {
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  //     if (commentUpdate[0]) {
  //       const getComment = await comment.findByPk(req.params.id);
  //       return baseResponse({
  //         success: true,
  //         message: "success update comment",
  //         data: getComment,
  //       })(res);
  //     }
  //     return res.status(404).json({
  //       succes: false,
  //       message: "comment not found",
  //       data: [],
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
module.exports = CommentController;
