"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {}
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      tea_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
