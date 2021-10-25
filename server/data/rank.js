import Records from './dummy/Records.js'
import Users from './dummy/Users.js'
import Images from './dummy/Images.js'

export async function findByEvent(event) {
  const record = Records.filter((el) => el.event === event)
  for(let i = 0; i < record.length; i++) {
    for(let j = 0; j < Users.length; j++) {
      if(record[i].userId === Users[i].id) {
        record[i].nickname = Users[i].nickname
        record[i].img = Images.find((el) => el.id === Users[i].img).link
      }
    }
  }
  return record.sort((a, b) => a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0)
  .sort((a, b) => b.point - a.point)
}

export async function findByNickname(nickname) {
  const user = Users.filter((el) => el.nickname.includes(nickname))
  const userRecord = Records.filter((el) => user.map((ele) => ele.id).includes(el.userId))
  for(let i = 0; i < userRecord.length; i++) {
    for(let j = 0; j < user.length; j++) {
      if(userRecord[i].userId === user[j].id) {
        userRecord[i].nickname = user[j].nickname
        userRecord[i].img = Images.find((el) => el.id === Users[i].img).link
      }
    }
  }
  return userRecord.sort((a, b) => a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0)
  .sort((a, b) => b.point - a.point)
}

export async function validUser(nickname) {
  return Users.find((el) => el.nickname === nickname)
}

export async function validEvent(event) {
  return (event === 'tennis' || event === 'pingpong' || event === 'squash' || event === 'badminton')
}