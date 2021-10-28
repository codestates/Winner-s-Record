import db from '../models/index.js';

export async function randomUserImg(list) {
  const imgId = list[Math.floor(Math.random() * list.length)];
  const img = await db.Images.findOne({
    where: { id: imgId },
  }).then((data) => data.dataValues);
  console.log('img :', img.link);
  return img.link;
}

export async function createUser(user) {
  const { email, password, nickname, type, img } = user;
  if (type === 'web') {
    const newUser = await db.Users.create({
      type,
      email,
      nickname,
      password,
      img,
    }).then((data) => data.dataValues);
    return newUser.id;
  }
}

export async function findByEmail(email) {
  try {
    const user = await db.Users.findOne({
      where: { email },
    }).then((data) => data.dataValues);
    return user;
  } catch {
    return null;
  }
}

export async function findByNickname(nickname) {
  try {
    const user = await db.Users.findOne({
      where: { nickname },
    }).then((data) => data.dataValues);
    return user;
  } catch {
    return null;
  }
}

export async function findById(id) {
  try {
    const user = await db.Users.findOne({
      where: { id },
    }).then((data) => data.dataValues);
    return user;
  } catch {
    return null;
  }
}

export async function editNickname(id, nickname) {
  const query = `UPDATE Users SET nickname='${nickname}'
      WHERE id='${id}';`;
  await db.Users.sequelize.query(query);
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}

export async function editPassword(id, password) {
  const query = `UPDATE Users SET password='${password}'
      WHERE id='${id}';`;
  await db.Users.sequelize.query(query);
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}
export async function editImg(id, img) {
  const query = `UPDATE Users SET img='${img}'
      WHERE id='${id}';`;
  await db.Users.sequelize.query(query);
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}

export async function remove(id) {
  await db.Users.destroy({
    where: { id },
  });
  return;
}
