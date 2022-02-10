import pkg from 'sequelize';
import db from '../models/index.js';
const { Op } = pkg;

export async function findAllRank(event) {
  const recordRank = await db.Records.findAll({
    where: {
      event: event,
    },
    order: [['point', 'DESC']]
  }).catch((err) => console.log(err))
  const userIdList = recordRank.map((el) => el.dataValues.userId)

  const rankUsers = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: userIdList
      }
    }
    }).catch((err) => console.log(err))

  const recordRankList = recordRank.map((el) => el.dataValues)
  const rankUserList = rankUsers.map((el) => el.dataValues)

  for(let i = 0; i < recordRankList.length; i++) {
    for(let j = 0; j < rankUserList.length; j++) {
      if(recordRankList[i].userId === rankUserList[j].id) {
        recordRankList[i].nickname = rankUserList[j].nickname
        recordRankList[i].img = rankUserList[j].img
      }
    }
  }
  recordRankList.sort((a, b) => a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0)
  .sort((a, b) => b.point - a.point);

  for(let i = 0; i < recordRankList.length; i++) {
    recordRankList[i].rank = i+1
  }

  const ranking = []
  let result = []
  recordRankList.map((el) => {
    if (result.length === 0) {
      result.push(el);
    } else {
      if (result[result.length - 1].point !== el.point) {
        ranking.push(...result);
        result = [];
        result.push(el);
      } else {
        result.push(el);
        result.map((el2) => (el2.rank = result[0].rank));
      }
    }
  });
  ranking.push(...result)
  return ranking
}

export async function findTopRank(data) {
  const result = data.slice(0, 20)
  for(let i = 0; i < result.length; i++) {
    if(result[i].point === 0) {
      result[i].rank = '-'
    }
  }
  return result
}

export async function findNicknameRank(data, nickname) {
  const user = await db.Users.findOne({
    where: {
      nickname: nickname
    }
  }).then((res) => res.dataValues)
  .catch((err) => console.log(err))

  const index = data.map((el) => el.userId).indexOf(user.id)
  let rankList
  if(index === 0 || index === 1 || index === 2) {
    rankList = data.slice(0, 5)
  } else if (index >= data.length-2) {
    rankList = data.slice(data.length - 5, data.length)
  } else {
    rankList = data.slice(index-2, index+3)
  }
  for(let i = 0; i < rankList.length; i++) {
    if(rankList[i].point === 0) {
      rankList[i].rank='-'
    }
  }
  return rankList
}

export async function validUser(nickname) {
  if(nickname === 'all') {
    return 'ok'
  }
  const result = await db.Users.findOne({
    where: {
      nickname: nickname
    }
  }).catch((err) => console.log(err))

  return result
}

export async function validEvent(event) {
  return (
    event === 'tennis' ||
    event === 'pingpong' ||
    event === 'squash' ||
    event === 'badminton'
  );
}
