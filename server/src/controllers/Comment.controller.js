const formatResponse = require("../utils/formatResponse");
const CommentService = require("../services/Comment.service");
const CommentValidator = require("../utils/CommentValidator");
const isValidId = require("../utils/isValidId");
const reformatId = require("../utils/reformatId");
class CommentController {
  static async getAllComments(req, res) {
    try {
      const comments = await CommentService.getAll();
      if (!comments) {
        return res
          .status(204)
          .json(formatResponse(204, "No comments found", []));
      }
      res.status(200).json(200).json(formatResponse(200, "success", comments));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getCommentByUserId(req, res) {
    const user_id = req.locals.user.id;
    if (!isValidId(user_id)) {
      return res.status(400).json(formatResponse(400, "Invalid task ID"));
    }

    try {
      const comment = await CommentService.getAllByUserId(reformatId(user_id));
      if (!comment) {
        return res
          .status(404)
          .json(
            formatResponse(404, `Comment with user_id ${user_id} not found`)
          );
      }
      res.status(200).json(formatResponse(200, "success", comment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createComment(req, res) {
    const { content } = req.body;
    const tea_id = req.params.id;
    const user_id = req.locals.user.id
    

    const { isValid, error } = CommentValidator.validate({ content });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newComments = await CommentService.create({
        content,
        user_id: reformatId(user_id),
        tea_id: reformatId(tea_id),
      });
      if (!newComments) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new comment`));
      }
      res.status(201).json(formatResponse(201, "success", newComments));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateComment(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid task ID"));
    }
    const { isValid, error } = CommentValidator.validate({ content });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const updatedComment = await CommentService.update(+id, { content });
      if (!updatedComment) {
        return res
          .status(404)
          .json(formatResponse(404, `Comment with id ${id} not found`));
      }
      res.status(200).json(formatResponse(200, "success", updatedComment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid task ID"));
    }
    try {
      const deletedComment = await CommentService.delete(+id);
      if (!deletedComment) {
        return res
          .status(404)
          .json(formatResponse(404, `Comment with id ${id} not found`));
      }
      res
        .status(200)
        .json(
          formatResponse(200, `Comment with id ${id} successfully deleted`)
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = CommentController;
