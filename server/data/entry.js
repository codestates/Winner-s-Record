import pkg from "sequelize";
import db from "../models/index.js";
const { Op } = pkg;

export async function findByDocId(docId, status) {
  let allEntries;
  if (status === "진행") {
    allEntries = await db.Entries.findAll({
      attributes: ["userId"],
      where: {
        docId,
        status: {
          [Op.ne]: "대기",
        },
      },
    });
  } else if (status === "대기") {
    allEntries = await db.Entries.findAll({
      attributes: ["userId"],
      where: { docId },
    });
  }

  const entryId = allEntries.map((el) => {
    return el.dataValues.userId;
  });
  const entryNickname = [];
  for (let i = 0; i < entryId.length; i++) {
    let nickname = await db.Users.findOne({
      attributes: ["nickname"],
      where: { id: entryId[i] },
    }).then((data) => data.dataValues.nickname);
    entryNickname.push(nickname);
  }
  return entryNickname;
}

export async function addPostEntry(userId, docId) {
  const doc = await db.Docs.findOne({
    where: {
      id: docId,
    },
  }).catch((err) => console.log(err));

  if (
    doc !== null &&
    (doc.type === "tounarment" || doc.type === "match") &&
    doc.status === "대기"
  ) {
    const entry = await db.Entries.create({
      status: "대기",
      docId: docId,
      userId: userId,
    }).catch((err) => console.log(err));

    const entries = await db.Entries.findAll({
      where: {
        docId: docId,
      },
    }).catch((err) => console.log(err));
    return entries.map((el) => el.dataValues);
  } else if (
    doc !== null &&
    (doc.type === "tounarment" || doc.type === "match") &&
    doc.status === "진행"
  ) {
    const playEntries = await db.Entries.findAll({
      where: {
        docId: docId,
      },
    }).catch((err) => console.log(err));
    return playEntries.map((el) => el.dataValues);
  }
}

export async function entryList(docId, entries) {
  const event = await db.Docs.findOne({
    where: {
      id: docId,
    },
  })
    .then((res) => res.dataValues.event)
    .catch((err) => console.log(err));

  const userId = entries.map((el) => el.userId);
  const users = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: userId,
      },
    },
  }).catch((err) => console.log(err));
  const userList = users.map((el) => el.dataValues);

  const rank = await db.Records.findAll({
    where: {
      event: event,
    },
  }).catch((err) => console.log(err));

  const rankList = rank
    .map((el) => el.dataValues)
    .sort((a, b) => b.point - a.point);

  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < userList.length; j++) {
      if (entries[i].userId === userList[j].id) {
        entries[i].nickname = userList[j].nickname;
        entries[i].img = userList[j].img;
      }
    }
  }

  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < rankList.length; j++) {
      if (entries[i].userId === rankList[j].userId) {
        entries[i].win = rankList[j].win;
        entries[i].lose = rankList[j].lose;
        entries[i].point = rankList[j].point;
        entries[i].rank = rankList.indexOf(rankList[j]) + 1;
      }
    }
  }
  return entries;
}

export async function deleteEntryPost(hostId, docId, userId) {
  const checkHostDoc = await db.Entries.findOne({
    where: {
      docId: docId,
      status: "호스트",
    },
  })
    .then((res) => res.dataValues)
    .catch((err) => console.log(err));

  if (checkHostDoc.userId === hostId) {
    const entry = await db.Entries.findOne({
      where: {
        docId: docId,
        userId: userId,
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));
    if (entry !== undefined && entry.status === "대기") {
      const deleteUser = await db.Entries.destroy({
        where: {
          id: entry.id,
        },
      }).catch((err) => console.log(err));

      const playEntries = await db.Entries.findAll({
        where: {
          docId: docId,
        },
      }).catch((err) => console.log(err));
      return playEntries.map((el) => el.dataValues);
    }
  }
}

export async function changeEntryStatus(hostId, docId, userId) {
  const checkHostDoc = await db.Entries.findOne({
    where: {
      docId: docId,
      status: "호스트",
    },
  })
    .then((res) => res.dataValues)
    .catch((err) => console.log(err));

  if (checkHostDoc.userId === hostId) {
    const entry = await db.Entries.findOne({
      where: {
        docId: docId,
        userId: userId,
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));

    if (entry !== undefined && entry.status === "확정") {
      const updateStatus = await db.Entries.update(
        {
          status: "대기",
        },
        {
          where: {
            id: entry.id,
          },
        }
      ).catch((err) => console.log(err));

      const playEntries = await db.Entries.findAll({
        where: {
          docId: docId,
        },
      }).catch((err) => console.log(err));
      return playEntries.map((el) => el.dataValues);
    } else if (entry !== undefined && entry.status === "대기") {
      const updateStatus2 = await db.Entries.update(
        {
          status: "확정",
        },
        {
          where: {
            id: entry.id,
          },
        }
      ).catch((err) => console.log(err));

      const playEntries = await db.Entries.findAll({
        where: {
          docId: docId,
        },
      }).catch((err) => console.log(err));
      return playEntries.map((el) => el.dataValues);
    }
  }
}
