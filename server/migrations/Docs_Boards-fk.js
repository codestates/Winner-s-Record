'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Docs_Boards', {
      fields: ['docId'],
      type: 'foreign key',
      name: 'Docs_Boards.docId-fk',
      references: {
        table: 'Docs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Docs_Boards', {
      fields: ['boardId'],
      type: 'foreign key',
      name: 'Docs_Boards.boardId-fk',
      references: {
        table: 'Boards',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Docs_Boards', 'Docs_Boards.docId-fk');
    await queryInterface.removeColumn('Docs_Boards', 'docId');
    await queryInterface.removeConstraint( 'Docs_Boards', 'Docs_Boards.boardId-fk');
    await queryInterface.removeColumn('Docs_Boards', 'boardId');
  }
};
