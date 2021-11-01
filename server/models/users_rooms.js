"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Users_Rooms.hasMany(models.Rooms);
      Users_Rooms.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }
  Users_Rooms.init(
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users_Rooms",
    }
  );
  return Users_Rooms;
};
