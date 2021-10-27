'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs_Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Docs_Boards.belongsTo(models.Docs, {
        foreignKey: 'docId'
      })
      Docs_Boards.belongsTo(models.Boards, {
        foreignKey: 'boardId'
      })
    }
  };
  Docs_Boards.init({
    docId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Docs_Boards',
  });
  return Docs_Boards;
};