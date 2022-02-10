'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Entries', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Entries.userId-fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Entries', {
      fields: ['docId'],
      type: 'foreign key',
      name: 'Entries.docId-fk',
      references: {
        table: 'Docs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Entries', 'Entries.userId-fk');
    await queryInterface.removeColumn('Entries', 'userId');
    await queryInterface.removeConstraint( 'Entries', 'Entries.docId-fk');
    await queryInterface.removeColumn('Entries', 'docId');
  }
};
