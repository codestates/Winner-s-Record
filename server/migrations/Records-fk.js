'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Records', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Records.userId-fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Records', 'Records.userId-fk');
    await queryInterface.removeColumn('Records', 'userId');
  }
};
