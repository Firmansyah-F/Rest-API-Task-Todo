'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      task.hasMany(models.comment)
      task.belongsTo(models.user)
    }
  };
  task.init({
    userId: DataTypes.INTEGER,
    assignee: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    status: DataTypes.ENUM("todo","need to review","work in progress","complete"),
    attachment: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
    paranoid:true
  });
  return task;
};