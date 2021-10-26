'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Docs_Image.belongsTo(models.Doc, {
        foreignKey: 'docId'
      })
      Docs_Image.belongsTo(models.Image, {
        foreignKey: 'imgId'
      })
    }
  };
  Docs_Image.init({
    postId: DataTypes.INTEGER,
    imgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Docs_Image',
  });
  return Docs_Image;
};