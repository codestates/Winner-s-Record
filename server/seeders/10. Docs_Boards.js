'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Docs_Boards = [
      {
        id: 1,
        docId: 1,
        boardId: 1,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 2,
        docId: 1,
        boardId: 2,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 3,
        docId: 1,
        boardId: 3,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 4,
        docId: 2,
        boardId: 4,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 5,
        docId: 3,
        boardId: 5,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 6,
        docId: 3,
        boardId: 6,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 7,
        docId: 4,
        boardId: 7,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 8,
        docId: 4,
        boardId: 8,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 9,
        docId: 4,
        boardId: 9,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 10,
        docId: 10,
        boardId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 11,
        docId: 10,
        boardId: 11,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 12,
        docId: 10,
        boardId: 12,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
      {
        id: 13,
        docId: 10,
        boardId: 13,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
    ]
    await queryInterface.bulkInsert('Docs_Boards', Docs_Boards, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Docs_Boards', null, {})
  }
};
