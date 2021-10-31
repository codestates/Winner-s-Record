import db from "../models/index.js";

export async function randomUserImg(list) {
  const imgId = list[Math.floor(Math.random() * list.length)];
  const img = await db.Images.findOne({
    where: { id: imgId },
  }).then((data) => data.dataValues);
  return img.link;
}

export async function createUser(user) {
  const { email, password, nickname, type, img } = user;
  if (type === "web") {
    const newUser = await db.Users.create({
      type,
      email,
      nickname,
      password,
      img,
    }).then((data) => data.dataValues);
    return newUser.id;
  } else {
    return "not web signup";
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
  await db.Users.update({ nickname }, { where: { id } });
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}

export async function editPassword(id, password) {
  await db.Users.update({ password }, { where: { id } });
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}
export async function editImg(id, img) {
  await db.Users.update({ img }, { where: { id } });
  const user = await db.Users.findOne({
    where: { id },
  }).then((data) => data.dataValues);
  return user;
}

export async function remove(id) {
  const removedUser = await db.Users.destroy({
    where: { id },
  });
  return removedUser;
}
