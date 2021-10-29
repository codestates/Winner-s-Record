'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matche extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Matche.init({
    type: DataTypes.STRING,
    event: DataTypes.STRING,
    winnerId: DataTypes.INTEGER,
    loserId: DataTypes.INTEGER,
    player: DataTypes.STRING,
    docId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Matche',
  });
  return Matche;
};