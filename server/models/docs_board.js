'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs_Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Docs_Board.belongsTo(models.Doc, {
        foreignKey: 'docId'
      })
      Docs_Board.belongsTo(models.Board, {
        foreignKey: 'boardId'
      })
    }
  };
  Docs_Board.init({
    postId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Docs_Board',
  });
  return Docs_Board;
};