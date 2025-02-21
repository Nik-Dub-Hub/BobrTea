'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate({Tea, Comment}) {
      this.belongsToMany(Tea,{
        foreignKey: 'user_id',
        as: 'Comments',
        through:{
          model: Comment,
        },


      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};