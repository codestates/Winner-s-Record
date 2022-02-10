'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs_Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Docs_Images.belongsTo(models.Docs, {
        foreignKey: 'docId'
      })
      Docs_Images.belongsTo(models.Images, {
        foreignKey: 'imgId'
      })
    }
  };
  Docs_Images.init({
    docId: DataTypes.INTEGER,
    imgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Docs_Images',
  });
  return Docs_Images;
};