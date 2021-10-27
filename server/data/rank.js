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
  })
  const userId = recordRank.map((el) => el.dataValues.userId)
  const users = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: userId
      }
    }
  })
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
  return recordList
  .sort((a, b) =>
    a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0
  )
  .sort((a, b) => b.point - a.point);
}

export async function findNicknameRank(event, nickname) {
  const recordRank = await db.Records.findAll({
    where: {
      event: event,
    },
    order: [['point', 'DESC']]
  })
  const user = await db.Users.findOne({
    where: {
      nickname: nickname
    }
  })
  const recordList = recordRank.map((el) => el.dataValues)
  const index = recordList.map((el) => el.userId).indexOf(user.dataValues.id)

  let rankList
  if(index === 0 || index === 1 || index === 2) {
    rankList = recordList.slice(0, 5)
  } else if (index >= recordList.length-3) {
    rankList = recordList.slice(recordList.length - 5, recordList.length)
  } else {
    rankList = recordList.slice(index-2, index+3)
  }

  const userId = rankList.map((el) => el.userId)
  const users = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: userId
      }
    }
  })
  const userList = users.map((el) => el.dataValues)
  for(let i = 0; i < rankList.length; i++) {
    for(let j = 0; j < userList.length; j++) {
      if(rankList[i].userId === userList[j].id && rankList[i].userId === user.dataValues.id) {
        rankList[i].nickname = userList[j].nickname
        rankList[i].img = userList[j].img
        rankList[i].rank = index+1
      } else if(rankList[i].userId === userList[j].id) {
        rankList[i].nickname = userList[j].nickname
        rankList[i].img = userList[j].img
      }
    }
  }
  return rankList.sort((a, b) =>
  a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0).sort((a, b) => b.point - a.point)
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
