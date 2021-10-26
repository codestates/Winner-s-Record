'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Record)
      User.hasMany(models.Users_Doc)
      User.hasMany(models.Entrie)
      User.hasMany(models.Doc)
      // define association here
    }
  };
  User.init({
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};