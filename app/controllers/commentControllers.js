const { comment } = require("../db/models");
const { baseResponse } = require("../utils/helpers/baseResponse");
// const { Op } = require("sequelize");

class CommentController {
  static async create(req, res, next) {
    try {
      const createComment = await comment.create({
        userId: req.body.userId,
        taskId: req.body.taskId,
        comment: req.body.comment,
      });
      return baseResponse({
        success: true,
        message: "create new comment",
        data: createComment,
      })(res.status(201));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const getComment = await comment.findAll();
      return baseResponse({
        success: true,
        message: "get all comment",
        data: getComment,
      })(res);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const commentById = await comment.findByPk(req.params.id);
      console.log(vehicleById);

      return baseResponse({
        success: true,
        message: "get comment by Id",
        data: commentById,
      })(res);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const deleteComment = await comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deleteComment) {
        return res.status(204).json();
      }
      return res.status(404).json({
        succes: false,
        message: "comment tidak ditemukan",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const newComment = {
        userId: req.body.userId,
        taskId: req.body.taskId,
        comment: req.body.comment,
      };
      const commentUpdate = await comment.update(newComment, {
        where: {
          id: req.params.id,
        },
      });
      if (commentUpdate[0]) {
        const getComment = await comment.findByPk(req.params.id);
        return baseResponse({
          success: true,
          message: "success update comment",
          data: getComment,
        })(res);
      }
      return res.status(404).json({
        succes: false,
        message: "comment not found",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CommentController;