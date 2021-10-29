'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chattings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chattings.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
      Chattings.belongsTo(models.Rooms, {
        foreignKey: 'roomId'
      })
    }
  };
  Chattings.init({
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chattings',
  });
  return Chattings;
};