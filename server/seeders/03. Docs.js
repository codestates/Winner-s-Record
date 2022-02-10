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
        place:
          "37.5430701468405|127.041799099222|서울 성동구 뚝섬로 273|서울숲 관리사무소|서울 성동구 성수동1가",
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
        place:
          "37.6219958993045|126.827199307351|경기 고양시 덕양구 행당로11번길 42|능곡배드민턴체육관|경기 고양시 덕양구 토당동",
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
        place:
          "36.0774274933319|129.38430061226|경북 포항시 북구 법원로25번길 14|장성스쿼시클럽|경북 포항시 북구 장성동",
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
        place:
          "35.0787446747132|129.077946712695|부산 영도구 해양로301번길 36|부산탁구체육관|부산 영도구 동삼동",
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
        place:
          "35.3628507387626|127.680649671828|경남 함양군 마천면 백무동로 313|백무동탐방안내센터|경남 함양군 마천면 강청리",
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
        place:
          "35.3628507387626|127.680649671828|경남 함양군 마천면 백무동로 313|백무동탐방안내센터|경남 함양군 마천면 강청리",
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
        place:
          "35.5233674213102|127.721968342746|경남 함양군 함양읍 필봉산길 48|null|경남 함양군 함양읍 교산리",
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
        place:
          "37.5208795755362|127.022609971999|서울 강남구 가로수길 43|애플스토어|서울 강남구 신사동",
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
        place:
          "37.4673329871035|126.913775169258|서울 관악구 문성로16다길 133-71|선우테니스장|서울 관악구 신림동",
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
        place:
          "37.4937103072186|127.138269720267|서울 송파구 문정로 176|송파배드민턴체육관|서울 송파구 거여동",
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
        place:
          "35.3457077010435|129.038951677019|경남 양산시 중앙로 170|양산탁구장|경남 양산시 북부동",
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
