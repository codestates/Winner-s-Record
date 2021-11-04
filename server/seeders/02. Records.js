'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Records = [
      {
        id: 1,
        event: 'tennis',
        win: 1,
        lose: 0,
        point: 3,
        userId: 1,
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
        event: 'badminton',
        win: 5,
        lose: 2,
        point: 17,
        userId: 1,
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
        event: 'squash',
        win: 2,
        lose: 0,
        point: 6,
        userId: 1,
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
        event: 'pingpong',
        win: 0,
        lose: 7,
        point: 7,
        userId: 1,
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
        event: 'tennis',
        win: 1,
        lose: 1,
        point: 4,
        userId: 2,
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
        event: 'badminton',
        win: 6,
        lose: 3,
        point: 21,
        userId: 2,
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
        event: 'squash',
        win: 0,
        lose: 3,
        point: 3,
        userId: 2,
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
        event: 'pingpong',
        win: 12,
        lose: 1,
        point: 37,
        userId: 2,
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
        event: 'tennis',
        win: 0,
        lose: 1,
        point: 1,
        userId: 3,
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
        event: 'badminton',
        win: 11,
        lose: 0,
        point: 33,
        userId: 3,
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
        event: 'squash',
        win: 7,
        lose: 5,
        point: 26,
        userId: 3,
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
        event: 'pingpong',
        win: 3,
        lose: 9,
        point: 18,
        userId: 3,
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
        event: 'tennis',
        win: 15,
        lose: 2,
        point: 47,
        userId: 4,
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
        id: 14,
        event: 'badminton',
        win: 6,
        lose: 6,
        point: 24,
        userId: 4,
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
        id: 15,
        event: 'squash',
        win: 2,
        lose: 11,
        point: 17,
        userId: 4,
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
        id: 16,
        event: 'pingpong',
        win: 2,
        lose: 2,
        point: 8,
        userId: 4,
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
        id: 17,
        event: 'tennis',
        win: 0,
        lose: 12,
        point: 12,
        userId: 5,
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
        id: 18,
        event: 'badminton',
        win: 5,
        lose: 5,
        point: 20,
        userId: 5,
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
        id: 19,
        event: 'squash',
        win: 3,
        lose: 1,
        point: 10,
        userId: 5,
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
        id: 20,
        event: 'pingpong',
        win: 2,
        lose: 7,
        point: 13,
        userId: 5,
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
        id: 21,
        event: 'tennis',
        win: 5,
        lose: 9,
        point: 24,
        userId: 6,
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
        id: 22,
        event: 'badminton',
        win: 1,
        lose: 5,
        point: 8,
        userId: 6,
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
        id: 23,
        event: 'squash',
        win: 0,
        lose: 19,
        point: 19,
        userId: 6,
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
        id: 24,
        event: 'pingpong',
        win: 2,
        lose: 9,
        point: 15,
        userId: 6,
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
        id: 25,
        event: 'tennis',
        win: 7,
        lose: 3,
        point: 24,
        userId: 7,
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
        id: 26,
        event: 'badminton',
        win: 3,
        lose: 3,
        point: 12,
        userId: 7,
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
        id: 27,
        event: 'squash',
        win: 9,
        lose: 11,
        point: 38,
        userId: 7,
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
        id: 28,
        event: 'pingpong',
        win: 2,
        lose: 2,
        point: 8,
        userId: 7,
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
        id: 29,
        event: 'tennis',
        win: 3,
        lose: 1,
        point: 10,
        userId: 8,
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
        id: 30,
        event: 'badminton',
        win: 6,
        lose: 2,
        point: 20,
        userId: 8,
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
        id: 31,
        event: 'squash',
        win: 4,
        lose: 4,
        point: 16,
        userId: 8,
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
        id: 32,
        event: 'pingpong',
        win: 0,
        lose: 2,
        point: 2,
        userId: 8,
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
        id: 33,
        event: 'tennis',
        win: 0,
        lose: 3,
        point: 3,
        userId: 9,
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
        id: 34,
        event: 'badminton',
        win: 2,
        lose: 7,
        point: 13,
        userId: 9,
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
        id: 35,
        event: 'squash',
        win: 6,
        lose: 2,
        point: 20,
        userId: 9,
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
        id: 36,
        event: 'pingpong',
        win: 4,
        lose: 9,
        point: 21,
        userId: 9,
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
        id: 37,
        event: 'tennis',
        win: 3,
        lose: 7,
        point: 16,
        userId: 10,
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
        id: 38,
        event: 'badminton',
        win: 3,
        lose: 3,
        point: 12,
        userId: 10,
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
        id: 39,
        event: 'squash',
        win: 18,
        lose: 0,
        point: 54,
        userId: 10,
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
        id: 40,
        event: 'pingpong',
        win: 3,
        lose: 5,
        point: 14,
        userId: 10,
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
        id: 41,
        event: 'tennis',
        win: 0,
        lose: 2,
        point: 2,
        userId: 11,
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
        id: 42,
        event: 'badminton',
        win: 1,
        lose: 1,
        point: 4,
        userId: 11,
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
        id: 43,
        event: 'squash',
        win: 9,
        lose: 2,
        point: 20,
        userId: 11,
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
        id: 44,
        event: 'pingpong',
        win: 4,
        lose: 2,
        point: 14,
        userId: 11,
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
        id: 45,
        event: 'tennis',
        win: 6,
        lose: 6,
        point: 24,
        userId: 12,
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
        id: 46,
        event: 'badminton',
        win: 2,
        lose: 1,
        point: 7,
        userId: 12,
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
        id: 47,
        event: 'squash',
        win: 1,
        lose: 8,
        point: 9,
        userId: 12,
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
        id: 48,
        event: 'pingpong',
        win: 3,
        lose: 3,
        point: 12,
        userId: 12,
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
        id: 49,
        event: 'tennis',
        win: 0,
        lose: 1,
        point: 1,
        userId: 13,
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
        id: 50,
        event: 'badminton',
        win: 1,
        lose: 1,
        point: 4,
        userId: 13,
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
        id: 51,
        event: 'squash',
        win: 2,
        lose: 11,
        point: 13,
        userId: 13,
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
        id: 52,
        event: 'pingpong',
        win: 4,
        lose: 1,
        point: 13,
        userId: 13,
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
        id: 53,
        event: 'tennis',
        win: 0,
        lose: 0,
        point: 0,
        userId: 14,
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
        id: 54,
        event: 'badminton',
        win: 0,
        lose: 1,
        point: 1,
        userId: 14,
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
        id: 55,
        event: 'squash',
        win: 0,
        lose: 5,
        point: 5,
        userId: 14,
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
        id: 56,
        event: 'pingpong',
        win: 2,
        lose: 3,
        point: 9,
        userId: 14,
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
        id: 57,
        event: 'tennis',
        win: 5,
        lose: 2,
        point: 17,
        userId: 15,
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
        id: 58,
        event: 'badminton',
        win: 0,
        lose: 1,
        point: 1,
        userId: 15,
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
        id: 59,
        event: 'squash',
        win: 6,
        lose: 1,
        point: 19,
        userId: 15,
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
        id: 60,
        event: 'pingpong',
        win: 0,
        lose: 0,
        point: 0,
        userId: 15,
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
        id: 61,
        event: 'tennis',
        win: 0,
        lose: 5,
        point: 5,
        userId: 16,
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
        id: 62,
        event: 'badminton',
        win: 0,
        lose: 1,
        point: 1,
        userId: 16,
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
        id: 63,
        event: 'squash',
        win: 0,
        lose: 0,
        point: 0,
        userId: 16,
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
        id: 64,
        event: 'pingpong',
        win: 11,
        lose: 0,
        point: 33,
        userId: 16,
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
        id: 65,
        event: 'tennis',
        win: 10,
        lose: 2,
        point: 32,
        userId: 17,
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
        id: 66,
        event: 'badminton',
        win: 0,
        lose: 7,
        point: 7,
        userId: 17,
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
        id: 67,
        event: 'squash',
        win: 2,
        lose: 3,
        point: 9,
        userId: 17,
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
        id: 68,
        event: 'pingpong',
        win: 0,
        lose: 8,
        point: 8,
        userId: 17,
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
        id: 69,
        event: 'tennis',
        win: 2,
        lose: 5,
        point: 11,
        userId: 18,
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
        id: 70,
        event: 'badminton',
        win: 3,
        lose: 6,
        point: 15,
        userId: 18,
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
        id: 71,
        event: 'squash',
        win: 4,
        lose: 1,
        point: 13,
        userId: 18,
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
        id: 72,
        event: 'pingpong',
        win: 0,
        lose: 0,
        point: 0,
        userId: 18,
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
        id: 73,
        event: 'tennis',
        win: 0,
        lose: 8,
        point: 8,
        userId: 19,
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
        id: 74,
        event: 'badminton',
        win: 0,
        lose: 1,
        point: 1,
        userId: 19,
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
        id: 75,
        event: 'squash',
        win: 3,
        lose: 11,
        point: 20,
        userId: 19,
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
        id: 76,
        event: 'pingpong',
        win: 6,
        lose: 1,
        point: 19,
        userId: 19,
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
        id: 77,
        event: 'tennis',
        win: 3,
        lose: 6,
        point: 15,
        userId: 20,
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
        id: 78,
        event: 'badminton',
        win: 0,
        lose: 3,
        point: 3,
        userId: 20,
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
        id: 79,
        event: 'squash',
        win: 4,
        lose: 1,
        point: 13,
        userId: 20,
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
        id: 80,
        event: 'pingpong',
        win: 4,
        lose: 2,
        point: 14,
        userId: 20,
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
        id: 81,
        event: 'tennis',
        win: 0,
        lose: 0,
        point: 0,
        userId: 21,
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
        id: 82,
        event: 'badminton',
        win: 0,
        lose: 2,
        point: 2,
        userId: 21,
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
        id: 83,
        event: 'squash',
        win: 7,
        lose: 1,
        point: 22,
        userId: 21,
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
        id: 84,
        event: 'pingpong',
        win: 4,
        lose: 2,
        point: 14,
        userId: 21,
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
        id: 85,
        event: 'tennis',
        win: 0,
        lose: 5,
        point: 5,
        userId: 22,
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
        id: 86,
        event: 'badminton',
        win: 1,
        lose: 4,
        point: 7,
        userId: 22,
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
        id: 87,
        event: 'squash',
        win: 0,
        lose: 4,
        point: 4,
        userId: 22,
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
        id: 88,
        event: 'pingpong',
        win: 0,
        lose: 0,
        point: 0,
        userId: 22,
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
        id: 89,
        event: 'tennis',
        win: 0,
        lose: 0,
        point: 0,
        userId: 23,
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
        id: 90,
        event: 'badminton',
        win: 0,
        lose: 0,
        point: 0,
        userId: 23,
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
        id: 91,
        event: 'squash',
        win: 0,
        lose: 0,
        point: 0,
        userId: 23,
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
        id: 92,
        event: 'pingpong',
        win: 2,
        lose: 1,
        point: 7,
        userId: 23,
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
        id: 93,
        event: 'tennis',
        win: 4,
        lose: 0,
        point: 12,
        userId: 24,
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
        id: 94,
        event: 'badminton',
        win: 5,
        lose: 0,
        point: 15,
        userId: 24,
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
        id: 95,
        event: 'squash',
        win: 0,
        lose: 0,
        point: 0,
        userId: 24,
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
        id: 96,
        event: 'pingpong',
        win: 0,
        lose: 2,
        point: 2,
        userId: 24,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, ''), 
      },
    ];
    await queryInterface.bulkInsert('Records', Records, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Records', null, {})
  }
};
