"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Chattings = [
      {
        id: 1,
        userId: 1,
        roomId: 1,
        content: "혹시 물건이 아직 팔렸을까요?",
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
        userId: 9,
        roomId: 1,
        content: "아니요! 아직 있습니다",
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
        userId: 9,
        roomId: 1,
        content: "원하신다면 가격 좀 더 맞춰드립니다~~~~",
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
        userId: 1,
        roomId: 1,
        content: "아 그러면 25000원까지 가능할까요?",
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
        userId: 14,
        roomId: 2,
        content: "물건팔렸나요",
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
        userId: 9,
        roomId: 2,
        content: "아니요 안팔렸습니다~~~",
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
        userId: 10,
        roomId: 3,
        content: "혹시 정품 맞나요? 의심스러워서요",
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
        userId: 9,
        roomId: 3,
        content: "정품맞습니다~~~ 급처해야해서 싸게 팝니다",
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
        userId: 3,
        roomId: 4,
        content: "안녕하세요~~",
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
        userId: 8,
        roomId: 5,
        content: "탁구 세트 얼마나 사용하셨나요~~?",
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
        id: 11,
        userId: 11,
        roomId: 5,
        content: "1년 조금 안되었습니다~",
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
        id: 12,
        userId: 11,
        roomId: 5,
        content: "엄청 싸게 파는거에요~ 상태도 괜찮고요.",
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
    await queryInterface.bulkInsert("Chattings", Chattings, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Chattings", null, {});
  },
};
