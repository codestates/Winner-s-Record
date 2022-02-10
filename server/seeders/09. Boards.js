'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Boards = [
      //포스트가 진행 => 보드가 생성 / 호스트가 무조건 처음 '안녕하세요'라는 문장 보내기
      {
        id: 1,
        userId: 1,
        text: '안녕하세요',
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
        userId: 2,
        text: '이번엔 이길거에요',
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
        userId: 1,
        text: '네네 그러시겠지요',
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
        userId: 3,
        text: '안녕하세요',
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
        userId: 5,
        text: '안녕하세요',
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
        userId: 6,
        text: '반갑습니다. 이따가 뵐까요?',
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
        userId: 7,
        text: '안녕하세요',
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
        userId: 8,
        text: '경기 끝나고 뭐 먹을실래요???',
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
        userId: 8,
        text: '오늘 뭔가 치맥이 땡기는데....ㅎㅎㅎ',
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
        userId: 19,
        text: '안녕하세요',
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
        userId: 12,
        text: '잘 부탁드려요. 페어플레이요',
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
        userId: 11,
        text: '즐겜해요~~~~~',
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
        userId: 15,
        text: '제발 비 안오길......비 오면 미뤄지는거 맞죠?',
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
    await queryInterface.bulkInsert('Boards', Boards, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Boards', null, {})
  }
};
