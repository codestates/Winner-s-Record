import pkg from 'sequelize';
import db from '../models/index.js';
const { Op } = pkg;

export async function chatList(userId) {
  const list = await db.Rooms.findAll({
    where: {
      [Op.or]: {
        hostId: userId,
        guestId: userId
      }
    }
  }).catch((err) => console.log(err))
  const chatList = list.map((el) => el.dataValues)
  const hostId = list.map((el) => el.hostId).filter((ele) => ele !== userId)
  const guestId = list.map((el) => el.guestId).filter((ele) => ele !== userId)
  const hostUser = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: hostId 
        }
      }
  }).catch((err) => console.log(err))

  const guestUser = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: guestId
      }
    }
  }).catch((err) => console.log(err))
  const hostUserList = hostUser.map((el) => el.dataValues)
  const guestUserList = guestUser.map((el) => el.dataValues)
  for(let i = 0; i < chatList.length; i++) {
    for(let j = 0; j < hostUserList.length; j++) {
      if(chatList[i].hostId === hostUserList[j].id) {
        chatList[i].nickname = hostUserList[j].nickname
        chatList[i].img = hostUserList[j].img
      }
    }
  }
  for(let i = 0; i < chatList.length; i++) {
    for(let j = 0; j < guestUserList.length; j++) {
      if(chatList[i].guestId === guestUserList[j].id) {
        chatList[i].nickname = guestUserList[j].nickname
        chatList[i].img = guestUserList[j].img
      }
    }
  }
  const roomId = chatList.map((el) => el.id)
  
  const chatting = await db.Chattings.findAll({
    where:{
      roomId : {
        [Op.in]: roomId
      }
    }
  }).catch((err) => console.log(err))
  const chattings = chatting.map((el) => el.dataValues)
  const chattingsMatch = {}
  for(let i = 0; i < chatList.length; i++) {
    for(let j = 0; j < chattings.length; j++) {
      if (chattingsMatch[chatList[i].id] === undefined && chatList[i].id === chattings[j].roomId) {
        chattingsMatch[chatList[i].id] = [chattings[j].id]
      } else if (chatList[i].id === chattings[j].roomId) {
        chattingsMatch[chatList[i].id].push(chattings[j].id)
      }
    }
  }
  for(let i = 0; i < chatList.length; i++) {
    for(let j = 0; j < chattings.length; j++) {
      for(let key in chattingsMatch) {
        if(chatList[i].id === chattings[j].roomId && chattings[j].id === Math.max(...chattingsMatch[key])) {
          chatList[i].content = chattings[j].content
          chatList[i].date = chattings[j].updatedAt
        }
      }
    }
  }
  return chatList
}