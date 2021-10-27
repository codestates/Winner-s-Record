'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Records.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
    }
  };
  Records.init({
    event: DataTypes.STRING,
    win: DataTypes.INTEGER,
    lose: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Records',
  });
  return Records;
};