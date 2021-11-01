"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Docs = [
      {
        id: 1,
        userId: 1,
        type: "match", // "거래" "토너먼트"
        status: "완료", // "진행" "완료"
        event: "tennis", // "베드민턴" "스쿼시" "탁구"
        title: "성수동 한게임 하실분",
        text: "잘하는분만 오세요",
        price: null,
        place: "성수동",
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
        userId: 3,
        type: "match",
        status: "대기",
        event: "badminton",
        title: "한판하고 밥먹으러 가요",
        text: "오늘 가볍게 한판하고 이따가 숯불갈비 먹으실 분 구해요",
        price: null,
        place: "다산동",
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
        userId: 5,
        type: "match",
        status: "진행",
        event: "squash",
        title: "한달 정도 같이 할 짝꿍구해요>_<",
        text: "스쿼시 완전 초보인데 이제 배워보려고하는데, 혹시 같이 해보실 분 계시면 신청해주세요~~",
        price: null,
        place: "다산동",
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
        userId: 7,
        type: "match",
        status: "완료",
        event: "pingpong",
        title: "제발 잘하시는 분만 와주세요",
        text: "초급자 말고 중급자 이상이신 분들만 요청해주세요. 제발요",
        price: null,
        place: "호평동",
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
        userId: 9,
        type: "trade",
        status: "대기",
        event: "tennis",
        title: "테니스 물품 급처해요",
        text: "하자 없습니다. 쿨거하시면 싸게 해드립니다.",
        price: 30000,
        place: "평내동",
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
        userId: 11,
        type: "trade",
        status: "대기",
        event: "pingpong",
        title: "탁구 세트 팝니다",
        text: "몇번 안쓰고 이제 필요없어서 팝니다. 연락 주세요~~~~~~",
        price: 45000,
        place: "판교역",
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
        userId: 13,
        type: "trade",
        status: "완료",
        event: "badminton",
        title: "배트민턴 물품 필요하신 분 클릭하세요",
        text: "거의 세거에요!!!! 몇번 안쓰고 사용하지 않아서 팝니다ㅠㅠㅠㅠㅠ 실사 원하시면 연락주세요!!",
        price: 33000,
        place: "금곡동",
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
        userId: 15,
        type: "trade",
        status: "대기",
        event: "squash",
        title: "팝니다",
        text: "필요하신분은 연락주세요",
        price: 41000,
        place: "도농동",
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
        userId: 17,
        type: "tournament",
        status: "대기",
        event: "tennis",
        title: "테니스 대회 엽니다. 많이 참여해주세요",
        text: "술내기해서 대회 엽니다. 많은 참여 부탁드립니다.",
        price: null,
        place: "개포동",
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
        userId: 19,
        type: "tournament",
        status: "완료",
        event: "badminton",
        title: "배드민턴 하실분 여기여기 붙어라~~~~~~~~",
        text: "이번주는 바람이 많이 부니까 다음주 월요일에 경기할 생각입니다~ 희망하시는 분 신청해주세용",
        price: null,
        place: "신사동",
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
        userId: 7,
        type: "match",
        status: "완료",
        event: "pingpong",
        title: "매치 너무 재밌어요ㅠㅠㅠㅠㅠ",
        text: "저는 중급자 정도 되는데 저랑 실력이 비슷하신 분만 오셨으면 좋겠네요",
        price: null,
        place: "호평동",
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
    await queryInterface.bulkInsert("Docs", Docs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Docs", null, {});
  },
};
