import Sequelize from 'sequelize';
import db from '../models/index.js';
const Op = Sequelize.Op;

export async function findByDocId(docId) {
  const allEntries = await db.Entries.findAll({
    attributes: ['userId'],
    where: {
      docId,
      status: {
        [Op.ne]: '대기',
      },
    },
  });
  const entryId = allEntries.map((el) => {
    return el.dataValues.userId;
  });
  const entryNickname = [];
  for (let i = 0; i < entryId.length; i++) {
    let nickname = await db.Users.findOne({
      attributes: ['nickname'],
      where: {id: entryId[i]},
    }).then((data) => data.dataValues.nickname);
    entryNickname.push(nickname);
  }
  return entryNickname;
}

export async function addPostEntry(userId, postId) {
  const post = Docs.find((el) => el.id === parseInt(postId));
  if (post.type === 'tounarment' && post.status === '대기') {
    const entry = {
      id: Entries.length + 1,
      status: '대기',
      postId: parseInt(postId),
      userId: userId,
    };
    Entries.push(entry);
    const entries = Entries.filter(
      (el) => el.postId === parseInt(postId) && el.status !== '호스트'
    );
    return entries;
  } else {
    return;
  }
}

export async function entryList(postId, entries) {
  const event = Docs.find((el) => el.id === parseInt(postId)).event;
  const userId = entries.map((el) => el.userId);
  const users = Users.filter((el) => userId.includes(el.id));
  let rank = Records.filter((el) => el.event === event)
    .sort((a, b) =>
      a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0
    )
    .sort((a, b) => b.point - a.point);
  for (let i = 0; i < entries.length; i++) {
    entries[i].nickname = users[i].nickname;
    entries[i].img = Images.find((el) => el.id === users[i].img).link;
    entries[i].win = rank.find((el) => el.userId === users[i].id).win;
    entries[i].lose = rank.find((el) => el.userId === users[i].id).lose;
    entries[i].point = rank.find((el) => el.userId === users[i].id).point;
    entries[i].rank = rank.findIndex((el) => el.userId === users[i].id) + 1;
  }
  return entries;
}

export async function deleteEntryPost(hostId, postId, userId) {
  const entries = Entries.filter(
    (el) => el.postId === parseInt(postId) && el.status !== '호스트'
  );
  const entryUser = entries
    .filter((el) => el.status === '대기')
    .map((el) => el.userId);
  const entryPost = Docs.find((el) => el.id === parseInt(postId));
  if (entryPost.userId === hostId && entryUser.includes(userId)) {
    return entries.filter((el) => el.userId !== userId);
  } else {
    return;
  }
}

export async function changeEntryStatus(hostId, postId, userId) {
  const entries = Entries.filter(
    (el) => el.postId === parseInt(postId) && el.status !== '호스트'
  );
  const entryUser = entries.map((el) => el.userId);
  const entryPost = Docs.find((el) => el.id === parseInt(postId));
  if (entryPost.userId === hostId && entryUser.includes(userId)) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].userId === userId && entries[i].status === '확정') {
        entries[i].status = '대기';
      } else if (entries[i].userId === userId && entries[i].status === '대기') {
        entries[i].status = '확정';
      }
    }
    return entries;
  } else {
    return;
  }
}
