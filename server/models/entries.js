'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entries.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
      Entries.belongsTo(models.Docs, {
        foreignKey: 'docId'
      })
    }
  };
  Entries.init({
    status: DataTypes.STRING,
    docId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entries',
  });
  return Entries;
};