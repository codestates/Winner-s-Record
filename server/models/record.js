'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Record.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      // define association here
    }
  };
  Record.init({
    event: DataTypes.STRING,
    win: DataTypes.INTEGER,
    lose: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};