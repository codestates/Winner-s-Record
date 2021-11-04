"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Matches = [
      {
        id: 1,
        type: "match", //"tournament"
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
        type: "tournamentR1",
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
        type: "tournamentR1",
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
        type: "tournamentR1",
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
        type: "tournamentR1",
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
        type: "tournamentR2",
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
        type: "tournamentR2",
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
        type: "tournamentR3",
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
      {
        id: 11,
        type: "match",
        event: "badminton",
        winner: "성수동조코비치",
        loser: "안암쇼바기",
        player: "성수동조코비치vs안암쇼바기",
        docId: null,
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
        type: "match",
        event: "badminton",
        winner: "성수동조코비치",
        loser: "안암쇼바기",
        player: "성수동조코비치vs안암쇼바기",
        docId: null,
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
        id: 13,
        type: "match",
        event: "badminton",
        winner: "성수동조코비치",
        loser: "안암쇼바기",
        player: "성수동조코비치vs안암쇼바기",
        docId: null,
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
        id: 14,
        type: "match",
        event: "pingpong",
        winner: "미르가온",
        loser: "성수동조코비치",
        player: "성수동조코비치vs미르가온",
        docId: null,
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
        id: 15,
        type: "match",
        event: "pingpong",
        winner: "떡볶이볶떡 ",
        loser: "성수동조코비치",
        player: "성수동조코비치vs떡볶이볶떡",
        docId: null,
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
        id: 16,
        type: "match",
        event: "pingpong",
        winner: "떡볶이볶떡 ",
        loser: "성수동조코비치",
        player: "성수동조코비치vs떡볶이볶떡",
        docId: null,
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
        id: 17,
        type: "match",
        event: "squash",
        winner: "성수동조코비치 ",
        loser: "다산동밥샙",
        player: "성수동조코비치vs다산동밥샙",
        docId: null,
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
        id: 18,
        type: "match",
        event: "squash",
        winner: "다산동밥샙 ",
        loser: "성수동조코비치",
        player: "성수동조코비치vs다산동밥샙",
        docId: null,
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
        id: 19,
        type: "match",
        event: "tennis",
        winner: "성수동조코비치 ",
        loser: "나봄",
        player: "성수동조코비치vs나봄",
        docId: null,
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
        id: 20,
        type: "match",
        event: "tennis",
        winner: "성수동조코비치 ",
        loser: "나봄",
        player: "성수동조코비치vs나봄",
        docId: null,
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
        id: 21,
        type: "match",
        event: "badminton",
        winner: "성수동조코비치 ",
        loser: "지리산신령님",
        player: "성수동조코비치vs지리산신령님",
        docId: null,
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
        id: 22,
        type: "match",
        event: "badminton",
        winner: "성수동조코비치 ",
        loser: "지리산신령님",
        player: "성수동조코비치vs지리산신령님",
        docId: null,
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
        id: 23,
        type: "match",
        event: "badminton",
        winner: "지리산신령님" ,
        loser: "성수동조코비치",
        player: "성수동조코비치vs지리산신령님",
        docId: null,
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
        id: 24,
        type: "match",
        event: "squash",
        winner: "보늬하늬" ,
        loser: "지리산신령님",
        player: "보늬하늬vs지리산신령님",
        docId: null,
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
        id: 25,
        type: "match",
        event: "squash",
        winner: "보늬하늬" ,
        loser: "지리산신령님",
        player: "보늬하늬vs지리산신령님",
        docId: null,
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
        id: 26,
        type: "match",
        event: "pingpong",
        winner: "지리산신령님" ,
        loser: "가온누리",
        player: "가온누리vs지리산신령님",
        docId: null,
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
        id: 27,
        type: "match",
        event: "squash",
        winner: "보늬하늬" ,
        loser: "지리산신령님",
        player: "보늬하늬vs지리산신령님",
        docId: null,
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
        id: 28,
        type: "match",
        event: "pingpong",
        winner: "지리산신령님" ,
        loser: "가온누리",
        player: "가온누리vs지리산신령님",
        docId: null,
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
        id: 29,
        type: "match",
        event: "pingpong",
        winner: "지리산신령님" ,
        loser: "가온누리",
        player: "가온누리vs지리산신령님",
        docId: null,
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
        id: 30,
        type: "match",
        event: "pingpong",
        winner: "지리산신령님" ,
        loser: "가온누리",
        player: "가온누리vs지리산신령님",
        docId: null,
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
        id: 31,
        type: "match",
        event: "badminton",
        winner: "가온누리" ,
        loser: "이루리",
        player: "가온누리vs이루리",
        docId: null,
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
        id: 32,
        type: "match",
        event: "badminton",
        winner: "가온누리" ,
        loser: "이루리",
        player: "가온누리vs이루리",
        docId: null,
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
        id: 33,
        type: "match",
        event: "badminton",
        winner: "가온누리" ,
        loser: "테니스한판",
        player: "가온누리vs테니스한판",
        docId: null,
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
        id: 33,
        type: "match",
        event: "badminton",
        winner: "가온누리" ,
        loser: "테니스한판",
        player: "가온누리vs테니스한판",
        docId: null,
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
        id: 34,
        type: "match",
        event: "pingpong",
        winner: "빛솔" ,
        loser: "가온누리",
        player: "가온누리vs빛솔",
        docId: null,
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
        id: 35,
        type: "match",
        event: "pingpong",
        winner: "빛솔" ,
        loser: "가온누리",
        player: "가온누리vs빛솔",
        docId: null,
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
        id: 36,
        type: "match",
        event: "pingpong",
        winner: "빛솔" ,
        loser: "가온누리",
        player: "가온누리vs빛솔",
        docId: null,
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
        id: 37,
        type: "match",
        event: "badminton",
        winner: "가온누리" ,
        loser: "이루리",
        player: "가온누리vs이루리",
        docId: null,
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
        id: 38,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "미르가온",
        player: "나봄vs미르가온",
        docId: null,
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
        id: 39,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "미르가온",
        player: "나봄vs미르가온",
        docId: null,
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
        id: 40,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "미르가온",
        player: "나봄vs미르가온",
        docId: null,
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
        id: 41,
        type: "match",
        event: "badminton",
        winner: "내이름김탁구" ,
        loser: "나봄",
        player: "나봄vs내이름김탁구",
        docId: null,
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
        id: 42,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "미르가온",
        player: "나봄vs미르가온",
        docId: null,
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
        id: 43,
        type: "match",
        event: "badminton",
        winner: "내이름김탁구" ,
        loser: "나봄",
        player: "나봄vs내이름김탁구",
        docId: null,
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
        id: 43,
        type: "match",
        event: "badminton",
        winner: "골톤" ,
        loser: "나봄",
        player: "나봄vs골톤",
        docId: null,
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
        id: 43,
        type: "match",
        event: "badminton",
        winner: "내이름김탁구" ,
        loser: "나봄",
        player: "나봄vs골톤",
        docId: null,
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
        id: 44,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "미르가온",
        player: "나봄vs미르가온",
        docId: null,
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
        id: 45,
        type: "match",
        event: "tennis",
        winner: "나봄" ,
        loser: "다산동밥샙",
        player: "나봄vs다산동밥샙",
        docId: null,
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
        id: 46,
        type: "match",
        event: "badminton",
        winner: "평강왕자" ,
        loser: "티아라",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 47,
        type: "match",
        event: "badminton",
        winner: "평강왕자" ,
        loser: "티아라",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 48,
        type: "match",
        event: "badminton",
        winner: "평강왕자" ,
        loser: "티아라",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 49,
        type: "match",
        event: "badminton",
        winner: "티아라" ,
        loser: "평강왕자",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 50,
        type: "match",
        event: "badminton",
        winner: "티아라" ,
        loser: "평강왕자",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 51,
        type: "match",
        event: "badminton",
        winner: "평강왕자" ,
        loser: "티아라",
        player: "티아라vs평강왕자",
        docId: null,
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
        id: 52,
        type: "match",
        event: "pingpong",
        winner: "골톤" ,
        loser: "티아라",
        player: "티아라vs골톤",
        docId: null,
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
        id: 53,
        type: "match",
        event: "pingpong",
        winner: "골톤" ,
        loser: "티아라",
        player: "티아라vs골톤",
        docId: null,
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
        id: 54,
        type: "match",
        event: "pingpong",
        winner: "골톤" ,
        loser: "티아라",
        player: "티아라vs골톤",
        docId: null,
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
        id: 55,
        type: "match",
        event: "pingpong",
        winner: "골톤" ,
        loser: "티아라",
        player: "티아라vs골톤",
        docId: null,
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
        id: 56,
        type: "match",
        event: "squash",
        winner: "찬누리" ,
        loser: "다산탁구왕",
        player: "찬누리vs다산탁구왕",
        docId: null,
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
        id: 57,
        type: "match",
        event: "squash",
        winner: "찬누리" ,
        loser: "다산탁구왕",
        player: "찬누리vs다산탁구왕",
        docId: null,
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
        id: 58,
        type: "match",
        event: "squash",
        winner: "찬누리" ,
        loser: "이루리",
        player: "찬누리vs이루리",
        docId: null,
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
        id: 59,
        type: "match",
        event: "squash",
        winner: "찬누리" ,
        loser: "이루리",
        player: "찬누리vs이루리",
        docId: null,
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
    await queryInterface.bulkDelete('Matches', null, {})
  },
};
