'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Matches', {
      fields: ['docId'],
      type: 'foreign key',
      name: 'Matches.docId-fk',
      references: {
        table: 'Docs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Matches', 'Matches.docId-fk');
    await queryInterface.removeColumn('Matches', 'docId');
  }
};
