'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users_Docs', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Users_Docs.userId-fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Users_Docs', {
      fields: ['docId'],
      type: 'foreign key',
      name: 'Users_Docs.docId-fk',
      references: {
        table: 'Docs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users_Docs', 'Users_Docs.userId-fk');
    await queryInterface.removeColumn('Users_Docs', 'userId');
    await queryInterface.removeConstraint( 'Users_Docs', 'Users_Docs.docId-fk');
    await queryInterface.removeColumn('Users_Docs', 'docId');
  }
};
