'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doc.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Doc.hasMany(models.Users_Doc)
      Doc.hasMany(models.Matche)
      Doc.hasMany(models.Docs_Board)
    }
  };
  Doc.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    event: DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    price: DataTypes.INTEGER,
    place: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doc',
  });
  return Doc;
};