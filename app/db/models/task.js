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
      // define association here
    }
  };
  task.init({
    userId: DataTypes.INTEGER,
    assignee: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    status: DataTypes.ENUM,
    attachment: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};