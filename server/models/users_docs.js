'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Docs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users_Docs.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
      Users_Docs.belongsTo(models.Docs, {
        foreignKey: 'docId'
      })
    }
  };
  Users_Docs.init({
    userId: DataTypes.INTEGER,
    docId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_Docs',
  });
  return Users_Docs;
};