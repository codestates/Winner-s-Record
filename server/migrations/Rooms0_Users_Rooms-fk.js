"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Users_Rooms", {
      fields: ["roomId"],
      type: "foreign key",
      name: "Users_Rooms.roomId-fk",
      references: {
        table: "Rooms",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Users_Rooms", {
      fields: ["userId"],
      type: "foreign key",
      name: "Users_Rooms.userId-fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Users_Rooms",
      "Users_Rooms.roomId-fk"
    );
    await queryInterface.removeColumn("Users_Rooms", "roomId");
    await queryInterface.removeConstraint(
      "Users_Rooms",
      "Users_Rooms.userId-fk"
    );
    await queryInterface.removeColumn("Users_Rooms", "userId");
  },
};
