"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Matches = [
      {
        id: 1,
        type: "match", //"tounarment"
        event: "tennis", //"pingpong" "스쿼시" "badminton"
        winner: "성수동조코비치",
        loser: "지리산신령님",
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
        winner: "무지개가맑다",
        loser: "밝은빛누리예",
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
        type: "tounarmentR1",
        event: "badminton",
        winner: "고로쇠물달다",
        loser: "내이름김탁구",
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
        type: "tounarmentR1",
        event: "badminton",
        winner: "빛솔",
        loser: "찬누리",
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
        type: "tounarmentR1",
        event: "badminton",
        winner: "이루리",
        loser: "골톤",
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
        type: "tounarmentR1",
        event: "badminton",
        winner: "다산탁구왕",
        loser: "다산동밥샙",
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
        type: "tounarmentR2",
        event: "badminton",
        winner: "고로쇠물달다",
        loser: "빛솔",
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
        type: "tounarmentR2",
        event: "badminton",
        winner: "이루리",
        loser: "다산탁구왕",
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
        type: "tounarmentR3",
        event: "badminton",
        winner: "고로쇠물달다",
        loser: "이루리",
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
        winner: "무지개가맑다",
        loser: "밝은빛누리예",
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
