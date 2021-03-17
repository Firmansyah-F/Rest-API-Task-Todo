'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.task)
      user.hasMany(models.comment)
      // define association here
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.ENUM("admin","user","supervisor"),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    paranoid:true
  });
  return user;
};