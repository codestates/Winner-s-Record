import pkg from 'sequelize';
import db from '../models/index.js';
const { Op } = pkg;

export async function findByType(type) {
  if (type === 'all') {
    return db.Docs.findAll()
  }
  const result = await db.Docs.findAll({
    where : {
      type: type
    }
  }).catch(err => console.log(err))

  return result
}

export async function findByEvent(data, event) {
  if (event === 'all') {
    return data;
  }
  return data.filter((post) => post.dataValues.event === event);
}

export async function findByTitle(data, title) {
  if (title === 'all') {
    return data;
  }
  return data.filter((post) => post.dataValues.title.includes(title));
}

export async function findByPlace(data, place) {
  if (place === 'all') {
    return data;
  }
  return data.filter((post) => post.place.includes(place));
}

export async function countLike(data) {ㅎ
  const docId = data.map((el) => el.dataValues.id)
  const result = await db.Users_Docs.findAll({
    where: {
      docId: {
        [Op.in]: docId
      }
    }
  })
  console.log(result)
}

export async function findByImg(data) {
  const id = data.map((post) =>
    Docs_images.filter((el) => el.postId === post.id)
  );
  return id.map((post) =>
    post.map((el) => Images.find((ele) => ele.id === el.imgId).link)
  );
}

export async function findByHost(hostId) {
  return Docs.filter((post) => post.userId === parseInt(hostId));
}

export async function findByGuest(guestId) {
  const id = Entries.filter(
    (entry) => entry.userId === parseInt(guestId) && entry.status === '확정'
  );
  return id.map((el) => Docs.filter((post) => post.id === el.postId)[0]);
}

export async function validUser(id) {
  return Users.find((el) => el.id === parseInt(id));
}

export async function findById(id) {
  return Docs.find((post) => post.id === id);
}

export async function validEvent(event) {
  return (
    event === 'all' ||
    event === 'tennis' ||
    event === 'pingpong' ||
    event === 'squash' ||
    event === 'badminton'
  );
}

export async function validType(type) {
  return (
    type === 'all' ||
    type === 'trade' ||
    type === 'match' ||
    type === 'tounarment'
  );
}
