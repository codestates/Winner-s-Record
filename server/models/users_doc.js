'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Doc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users_Doc.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Users_Doc.belongsTo(models.Doc, {
        foreignKey: 'docId'
      })
    }
  };
  Users_Doc.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_Doc',
  });
  return Users_Doc;
};