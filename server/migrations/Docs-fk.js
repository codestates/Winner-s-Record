'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Docs', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Docs.userId-fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Docs', 'Docs.userId-fk');
    await queryInterface.removeColumn('Docs', 'userId');
  }
};
