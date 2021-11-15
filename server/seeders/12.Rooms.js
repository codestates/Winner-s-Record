'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Rooms = [
      {
        id: 1,
        hostId: 9,
        guestId: 1,
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
        hostId: 9,
        guestId: 14,
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
        hostId: 9,
        guestId: 10,
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
        hostId: 10,
        guestId: 3,
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
        hostId: 11,
        guestId: 8,
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
        hostId: 6,
        guestId: 10,
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
    await queryInterface.bulkInsert('Rooms', Rooms, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {})
  }
};
