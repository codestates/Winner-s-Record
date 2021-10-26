'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = [
      {
        id: 1,
        type: 'web',
        email: 'a@gmail.com',
        nickname: '성수동조코비치',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'b@kakao.com',
        nickname: '지리산신령님',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test1@gmail.com',
        nickname: '가온누리',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test2@gmail.com',
        nickname: '나봄',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test3@gmail.com',
        nickname: '누리봄',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test4@gmail.com',
        nickname: '라별',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test5@gmail.com',
        nickname: '무지개가맑다',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test6@gmail.com',
        nickname: '밝은빛누리예',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test7@gmail.com',
        nickname: '보늬하늬',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test8@gmail.com',
        nickname: '고로쇠물달다',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test9@gmail.com',
        nickname: '빛솔',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test10@gmail.com',
        nickname: '이루리',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test11@gmail.com',
        nickname: '다산탁구왕',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'test12@gmail.com',
        nickname: '내이름김탁구',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'c@kakao.com',
        nickname: '찬누리',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'd@kakao.com',
        nickname: '골톤',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'web',
        email: 'e@kakao.com',
        nickname: '티아라',
        password: '$2b$12$NL6ys2Vw.ZxTeTYeYuXbhOLsOCQceNFYG8PjYOmopP05XtplMILOS',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'f@kakao.com',
        nickname: '람보람보',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'a@naver.com',
        nickname: '다산동밥샙',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'b@naver.com',
        nickname: '테니스한판',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'c@naver.com',
        nickname: '평강왕자',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        type: 'social',
        email: 'd@naver.com',
        nickname: '떡볶이볶떡',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        email: 'testtest@gmail.com',
        password: '$2b$12$w0Avc/lzr3A2gTW48MEVYetfsP/Q1wAt8OUNXgsLKLTzw..RMw0KG',
        nickname: '안암쇼바기',
        type: 'web',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
        email: 't@t.com',
        password: '$2b$12$NL6ys2Vw.ZxTeTYeYuXbhOLsOCQceNFYG8PjYOmopP05XtplMILOS',
        nickname: '테스트',
        type: 'web',
        img: 'https://mblogthumb-phinf.pstatic.net/20150403_3/e2voo_1428051429025fovp8_JPEG/kakako-04.jpg?type=w800',
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
    await queryInterface.bulkInsert('Users', Users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
