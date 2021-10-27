import db from '../models/index.js';

export async function createUser(user) {}

export async function findByEmail(email) {
  console.log(db.Users);
  const already = await db.Users.findOne({
    where: {email},
  });
  console.log(already);
  return already;
}

export async function findByNickname(nickname) {
  return Users.find((user) => user.nickname === nickname);
}

export async function findById(id) {
  return Users.find((user) => user.id === id);
}

export async function editNickname(id, nickname) {
  const user = Users.find((user) => user.id === id);
  if (!user) {
    return `${id} not found`;
  } else {
    user.nickname = nickname;
    console.log('닉네임변경 후 : ', user);
    return user;
  }
}

export async function editPassword(id, password) {
  const user = Users.find((user) => user.id === id);
  if (!user) {
    return `${id} not found`;
  } else {
    user.password = password;
    console.log('비밀번호변경 후 : ', user);
    return user;
  }
}
export async function editImg(id, img) {
  const user = Users.find((user) => user.id === id);
  if (!user) {
    return `${id} not found`;
  } else {
    user.img = img;
    console.log('이미지변경 후 : ', user);
    return user;
  }
}
export async function remove(id) {
  return Users.filter((user) => user.id !== id);
}
