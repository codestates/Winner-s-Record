'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Docs_Images', {
      fields: ['docId'],
      type: 'foreign key',
      name: 'Docs_Images.docId-fk',
      references: {
        table: 'Docs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Docs_Images', {
      fields: ['imgId'],
      type: 'foreign key',
      name: 'Docs_Images.imgId-fk',
      references: {
        table: 'Images',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint( 'Docs_Images', 'Docs_Images.docId-fk');
    await queryInterface.removeColumn('Docs_Images', 'docId');
    await queryInterface.removeConstraint( 'Docs_Images', 'Docs_Images.imgId-fk');
    await queryInterface.removeColumn('Docs_Images', 'imgId');
  }
};
