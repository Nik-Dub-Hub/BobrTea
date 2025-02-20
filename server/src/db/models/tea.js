'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {

    static associate({User, Comment}) {
      this.belongsToMany(User,{
        foreignKey:'tea_id',
        through:{
          model:Comment,
        },
      })
    }
  }
  Tea.init({
    title: DataTypes.STRING,
    place: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    width: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};