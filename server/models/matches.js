'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matches.belongsTo(models.Docs, {
        foreignKey: 'docId'
      })
    }
  };
  Matches.init({
    type: DataTypes.STRING,
    event: DataTypes.STRING,
    winnerId: DataTypes.INTEGER,
    loserId: DataTypes.INTEGER,
    docId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
};