import pkg from 'sequelize';
import db from '../models/index.js';
const { Op } = pkg;

export async function findAllRank(event) {
  const recordRank = await db.Records.findAll({
    where: {
      event: event,
    },
    order: [['point', 'DESC']],
    limit: 20
  }).catch((err) => console.log(err))

  const userId = recordRank.map((el) => el.dataValues.userId)
  const users = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: userId
      }
    }
  }).catch((err) => console.log(err))

  const recordList = recordRank.map((el) => el.dataValues)
  const userList = users.map((el) => el.dataValues)
  
  for(let i = 0; i < recordList.length; i++) {
    for(let j = 0; j < userList.length; j++) {
      if(recordList[i].userId === userList[j].id) {
        recordList[i].nickname = userList[j].nickname
        recordList[i].img = userList[j].img
      }
    }
  }
  recordList.sort((a, b) => a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0)
  .sort((a, b) => b.point - a.point);
  
  for(let i = 0; i < recordList.length; i++) {
    recordList[i].rank = i+1
  }

  const ranking = []
  let result = []
  recordList.map((el) => {
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

export async function findNicknameRank(event, nickname) {
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

  const user = await db.Users.findOne({
    where: {
      nickname: nickname
    }
  }).then((res) => res.dataValues)
  .catch((err) => console.log(err))

  const index = recordRankList.map((el) => el.userId).indexOf(user.id)
  let rankList
  if(index === 0 || index === 1 || index === 2) {
    rankList = ranking.slice(0, 5)
  } else if (index >= ranking.length-2) {
    rankList = ranking.slice(ranking.length - 5, ranking.length)
  } else {
    rankList = ranking.slice(index-2, index+3)
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
    event === 'sresultuash' ||
    event === 'badminton'
  );
}
