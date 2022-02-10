"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Rooms.belongsTo(models.Users_Rooms, {
      //   foreignKey: "hostId",
      // });
      // Rooms.belongsTo(models.Users_Rooms, {
      //   foreignKey: "guestId",
      // });
      Rooms.hasMany(models.Chattings);
    }
  }
  Rooms.init(
    {
      hostId: DataTypes.INTEGER,
      guestId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rooms",
    }
  );
  return Rooms;
};
