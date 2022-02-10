"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Chattings", {
      fields: ["userId"],
      type: "foreign key",
      name: "Chattings.userId-fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Chattings", {
      fields: ["roomId"],
      type: "foreign key",
      name: "Chattings.rommId-fk",
      references: {
        table: "Rooms",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Chattings", "Chattings.userId-fk");
    await queryInterface.removeColumn("Chattings", "userId");
    await queryInterface.removeConstraint("Chattings", "Chattings.roomId-fk");
    await queryInterface.removeColumn("Chattings", "roomId");
  },
};
