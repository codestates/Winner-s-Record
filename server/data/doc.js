import pkg from "sequelize";
import db from "../models/index.js";
import * as matchData from "./match.js";
import * as entryData from "./entry.js";
const { Op } = pkg;

export async function findByType(type) {
  if (type === "all") {
    return db.Docs.findAll({
      where: {
        type: {
          [Op.or]: ["trade", "match"],
        },
      },
    }).catch((err) => console.log(err));
  }
  const result = await db.Docs.findAll({
    where: {
      type: type,
    },
  }).catch((err) => console.log(err));

  return result;
}

export async function findByEvent(data, event) {
  if (event === "all") {
    return data;
  }
  return data.filter((post) => post.dataValues.event === event);
}

export async function findByTitle(data, title) {
  if (title === "all") {
    return data;
  }
  return data.filter((post) => post.dataValues.title.includes(title));
}

export async function findByPlace(data, place) {
  if (place === "all") {
    return data;
  }
  return data.filter((post) => post.dataValues.place.includes(place));
}

export async function countLike(data) {
  const docId = data.map((el) => el.id);
  const likeList = await db.Users_Docs.findAll({
    where: {
      docId: {
        [Op.in]: docId,
      },
    },
  }).catch((err) => console.log(err));

  const result = {};
  for (let i = 0; i < likeList.length; i++) {
    if (result[likeList[i].docId] === undefined) {
      result[likeList[i].docId] = 1;
    } else {
      result[likeList[i].docId]++;
    }
  }
  return result;
}

export async function findByImg(data) {
  const docId = data.map((el) => el.id);
  const docList = await db.Docs_Images.findAll({
    where: {
      docId: {
        [Op.in]: docId,
      },
    },
  }).catch((err) => console.log(err));

  const imgId = docList.map((el) => el.imgId);
  const imgList = await db.Images.findAll({
    where: {
      id: {
        [Op.in]: imgId,
      },
    },
  }).catch((err) => console.log(err));

  const result = {};
  for (let i = 0; i < docList.length; i++) {
    for (let j = 0; j < imgList.length; j++) {
      if (
        result[docList[i].docId] === undefined &&
        docList[i].imgId === imgList[j].id
      ) {
        result[docList[i].docId] = [imgList[j].link];
      } else if (docList[i].imgId === imgList[j].id) {
        result[docList[i].docId].push(imgList[j].link);
      }
    }
  }
  return result;
}

export async function findByHost(hostId) {
  const result = await db.Docs.findAll({
    where: {
      userId: hostId,
    },
  }).catch((err) => console.log(err));
  return result;
}

export async function findByGuest(guestId) {
  const participant = await db.Entries.findAll({
    where: {
      userId: guestId,
      status: "확정",
    },
  }).catch((err) => console.log(err));

  const parDocId = participant.map((el) => el.dataValues.docId);
  const result = await db.Docs.findAll({
    where: {
      id: {
        [Op.in]: parDocId,
      },
    },
  }).catch((err) => console.log(err));
  return result;
}

export async function validUser(id) {
  const result = await db.Users.findOne({
    where: {
      id: id,
    },
  }).catch((err) => console.log(err));
  return result;
}

export async function findById(id) {
  try {
    return db.Docs.findOne({
      where: { id },
    })
  } catch {
    return null;
  }
}

export async function validEvent(event) {
  return (
    event === "all" ||
    event === "tennis" ||
    event === "pingpong" ||
    event === "squash" ||
    event === "badminton"
  );
}

export async function validType(type) {
  return (
    type === "all" ||
    type === "trade" ||
    type === "match" ||
    type === "tournament"
  );
}

export async function editDoc(docId, data) {
  const img = data.img; //[string, string]

  if (Array.isArray(img) && !img.length) {
    await db.Docs_Images.destroy({
      where: { docId },
    });
    if (data.event === "tennis") {
      await db.Docs_Images.create({
        docId,
        imgId: 61,
      });
    } else if (data.event === "pingpong") {
      await db.Docs_Images.create({
        docId,
        imgId: 60,
      });
    } else if (data.event === "squash") {
      await db.Docs_Images.create({
        docId,
        imgId: 59,
      });
    } else if (data.event === "badminton") {
      await db.Docs_Images.create({
        docId,
        imgId: 58,
      });
    }
  } else if (Array.isArray(img)) {
    await db.Docs_Images.destroy({
      where: { docId },
    });
    for (let i = 0; i < img.length; i++) {
      const newImg = await db.Images.create({
        link: img[i],
      });
      await db.Docs_Images.create({
        docId,
        imgId: newImg.dataValues.id,
      });
    }
  }

  delete data.img;
  const { type, status, title, event, place, price, text } = data;

  if (status === "진행") {
    await db.Entries.destroy({
      where: { docId, status: "대기" },
    });
    if (type === "tournament") {
      const players = await entryData.findByDocId(docId);
      await matchData.tournamentMatch(docId, event, players);
    }
  }

  type && (await db.Docs.update({ type }, { where: { id: docId } }));
  title && (await db.Docs.update({ title }, { where: { id: docId } }));
  status && (await db.Docs.update({ status }, { where: { id: docId } }));
  event && (await db.Docs.update({ event }, { where: { id: docId } }));
  place && (await db.Docs.update({ place }, { where: { id: docId } }));
  price && (await db.Docs.update({ price }, { where: { id: docId } }));
  text && (await db.Docs.update({ text }, { where: { id: docId } }));

  const editedDoc = await db.Docs.findOne({
    where: { id: docId },
  }).catch((err) => console.log(err));
  return editedDoc;
}

export async function create(userId, data) {
  const { type, title, event, place, price, text, img } = data;
  let created;
  if(!(type && title && event && place && text)) {
    return "cannot create"
  }
  if (type === "trade") {
    if(!price) {
      return "cannot create"
    }
    created = await db.Docs.create({
      userId,
      type,
      status: "대기",
      event,
      title,
      text,
      price,
      place,
    });
  } else {
    created = await db.Docs.create({
      userId,
      type,
      status: "대기",
      event,
      title,
      text,
      place,
    });
  }
  // 사진추가 후 Doc_Images 생성
  if (!img.length) {
    if (event === "tennis") {
      await db.Docs_Images.create({
        docId: created.dataValues.id,
        imgId: 61,
      });
    } else if (event === "pingpong") {
      await db.Docs_Images.create({
        docId: created.dataValues.id,
        imgId: 60,
      });
    } else if (event === "squash") {
      await db.Docs_Images.create({
        docId: created.dataValues.id,
        imgId: 59,
      });
    } else if (event === "badminton") {
      await db.Docs_Images.create({
        docId: created.dataValues.id,
        imgId: 58,
      });
    }
  } else {
    for (let i = 0; i < img.length; i++) {
      const newImg = await db.Images.create({
        link: img[i],
      });
      await db.Docs_Images.create({
        docId: created.dataValues.id,
        imgId: newImg.dataValues.id,
      });
    }
  }

  // 보드에 호스트로 안녕하세요 생성, Docs_Boards 생성
  const firstBoard = await db.Boards.create({
    userId,
    text: "안녕하세요",
  });
  await db.Docs_Boards.create({
    docId: created.dataValues.id,
    boardId: firstBoard.dataValues.id,
  });

  //entry에 호스트 생성
  await db.Entries.create({
    status: "호스트",
    docId: created.dataValues.id,
    userId,
  });

  return created.dataValues;
}

export async function remove(docId) {
  await db.Docs.destroy({
    where: { id: docId },
  });
}

export async function slicePage(docList, page) {
  return docList.slice(page * 10, page * 10 + 10);
}
