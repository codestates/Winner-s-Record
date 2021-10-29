"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Matches = [
      {
        id: 1,
        type: "match", //"tounarment"
        event: "tennis", //"pingpong" "스쿼시" "badminton"
        winnerId: 1,
        loserId: 2,
        player: "성수동조코비치vs지리산신령님",
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
        player: "무지개가맑다vs밝은빛누리예",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 10,
        loserId: 14,
        player: "고로쇠물달다vs내이름김탁구",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 11,
        loserId: 15,
        player: "찬누리vs빛솔",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 12,
        loserId: 16,
        player: "이루리vs골톤",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 13,
        loserId: 19,
        player: "다산탁구왕vs다산동밥샙",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 10,
        loserId: 11,
        docId: 10,
        player: "빛솔vs고로쇠물달다",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 12,
        loserId: 13,
        player: "다산탁구왕vs이루리",
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
        type: "tounarment",
        event: "badminton",
        winnerId: 10,
        loserId: 12,
        player: "이루리vs고로쇠물달다",
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
        player: "무지개가맑다vs밝은빛누리예",
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
