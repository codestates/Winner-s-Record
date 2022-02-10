'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Docs.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
      Docs.hasMany(models.Users_Docs)
      Docs.hasMany(models.Matches)
      Docs.hasMany(models.Docs_Boards)
    }
  };
  Docs.init({
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
    modelName: 'Docs',
  });
  return Docs;
};