const { Comment } = require("../db/models");

class CommentService {
  static async getAll() {
    return await Comment.findAll();
  }

  static async getAllByUserId(user_id) {
    return await Comment.findAll({ where: { user_id } });
  }

  static async getAllByTeaId(tea_id) {
    return await Comment.findAll({
      where: { tea_id },
      attributes: ["id", "content", "tea_id", "user_id"],
    });
  }

  static async create(data) {
    const newComment = await Comment.create(data);
    console.log(newComment);
    return newComment
  }

  static async update(id, data) {
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.content = data.content;
      await comment.save();
    }
    return comment;
  }

  static async delete(id) {
    console.log(id);

    const comment = await Comment.findOne({ where: { id } });
    // console.log(comment);

    if (comment) {
      await comment.destroy();
    }
    return comment;
  }
}

module.exports = CommentService;
