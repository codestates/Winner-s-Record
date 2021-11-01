"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Rooms", {
      fields: ["hostId"],
      type: "foreign key",
      name: "Rooms.hostId-fk",
      references: {
        table: "Users_Rooms",
        field: "userId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Rooms", {
      fields: ["guestId"],
      type: "foreign key",
      name: "Rooms.guestId-fk",
      references: {
        table: "Users_Rooms",
        field: "userId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Rooms", "Rooms.hostId-fk");
    await queryInterface.removeColumn("Rooms", "hostId");
    await queryInterface.removeConstraint("Rooms", "Rooms.guestId-fk");
    await queryInterface.removeColumn("Rooms", "guestId");
  },
};
