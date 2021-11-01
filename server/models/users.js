"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Records);
      Users.hasMany(models.Users_Docs);
      Users.hasMany(models.Entries);
      Users.hasMany(models.Docs);
      Users.hasMany(models.Users_Rooms);
      Users.hasMany(models.Chattings);
    }
  }
  Users.init(
    {
      type: DataTypes.STRING,
      kakao: DataTypes.INTEGER,
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
