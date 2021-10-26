'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entrie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entrie.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Entrie.belongsTo(models.Doc, {
        foreignKey: 'docId'
      })
    }
  };
  Entrie.init({
    status: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entrie',
  });
  return Entrie;
};