"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Matches = [
      {
        id: 1,
        type: "match", //"tournament"
        event: "tennis", //"pingpong" "스쿼시" "badminton"
        winnerId: 1,
        loserId: 2,
        docId: 1,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 2,
        type: "match",
        event: "pingpong",
        winnerId: 7,
        loserId: 8,
        docId: 4,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 3,
        type: "tournament",
        event: "badminton",
        winnerId: 10,
        loserId: 14,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 4,
        type: "tournament",
        event: "badminton",
        winnerId: 11,
        loserId: 15,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 5,
        type: "tournament",
        event: "badminton",
        winnerId: 12,
        loserId: 16,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 6,
        type: "tournament",
        event: "badminton",
        winnerId: 13,
        loserId: 19,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 7,
        type: "tournament",
        event: "badminton",
        winnerId: 10,
        loserId: 11,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 8,
        type: "tournament",
        event: "badminton",
        winnerId: 12,
        loserId: 13,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 9,
        type: "tournament",
        event: "badminton",
        winnerId: 10,
        loserId: 12,
        docId: 10,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
      {
        id: 10,
        type: "match",
        event: "pingpong",
        winnerId: 7,
        loserId: 8,
        docId: 4,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
    ];
    await queryInterface.bulkInsert("Matches", Matches, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Matches", null, {});
  },
};
