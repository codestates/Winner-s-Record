import "express-async-errors";
import jwt from "jsonwebtoken";
import * as docData from "../data/doc.js";
import * as userData from "../data/auth.js";
import * as likeData from "../data/like.js";
import * as entryData from "../data/entry.js";
import * as boardData from "../data/board.js";
import { config } from "../config.js";

export async function searchDoc(req, res) {
  const { type, event, title, place, hostId, guestId, page } = req.query;

  if (type && event && title) {
    const types = await docData.validType(type);
    const events = await docData.validEvent(event);
    if (types && events) {
      const doc = await docData.findByType(type);
      const doc2 = await docData.findByEvent(doc, event);
      const doc3 = await docData.findByTitle(doc2, title);
      const docList = doc3.map((el) => el.dataValues);
      if (docList.length !== 0) {
        const like = await docData.countLike(docList);
        const img = await docData.findByImg(docList);
        const key = Object.keys(img);

        for (let i = 0; i < docList.length; i++) {
          for (let j = 0; j < key.length; j++) {
            if (docList[i].id === parseInt(key[j])) {
              docList[i].like = like[docList[j].id] || 0;
              docList[i].img = img[docList[j].id];
            }
          }
        }
        docList.sort((a, b) => b.id - a.id);
        const sliceDoc = await docData.slicePage(docList, page);
        return res.status(200).send({ data: sliceDoc });
      }
    } else {
      return res.status(404).send({ message: "해당 포스트가 없습니다" });
    }
  } else if (type && event && place) {
    const types = await docData.validType(type);
    const events = await docData.validEvent(event);
    if (types && events) {
      const doc = await docData.findByType(type);
      const doc2 = await docData.findByEvent(doc, event);
      const doc3 = await docData.findByPlace(doc2, place);
      const docList = doc3.map((el) => el.dataValues);
      if (docList.length !== 0) {
        const like = await docData.countLike(docList);
        const img = await docData.findByImg(docList);
        const key = Object.keys(img);

        for (let i = 0; i < docList.length; i++) {
          for (let j = 0; j < key.length; j++) {
            if (docList[i].id === parseInt(key[j])) {
              docList[i].like = like[docList[j].id] || 0;
              docList[i].img = img[docList[j].id];
            }
          }
        }
        docList.sort((a, b) => b.id - a.id);
        const sliceDoc = await docData.slicePage(docList, page);
        return res.status(200).send({ data: sliceDoc });
      }
    } else {
      return res.status(404).send({ message: "해당 포스트가 없습니다" });
    }
  } else if (hostId) {
    const user = await docData.validUser(hostId);
    const doc = await docData.findByHost(hostId);
    const docList = doc.map((el) => el.dataValues);
    if (user && docList.length !== 0) {
      const like = await docData.countLike(docList);
      const img = await docData.findByImg(docList);
      const key = Object.keys(img);

      for (let i = 0; i < docList.length; i++) {
        for (let j = 0; j < key.length; j++) {
          if (docList[i].id === parseInt(key[j])) {
            docList[i].like = like[docList[j].id] || 0;
            docList[i].img = img[docList[j].id];
          }
        }
      }
      docList.sort((a, b) => b.id - a.id);
      return res.status(200).send({ data: docList });
    } else {
      return res.status(404).send({ message: "해당 포스트가 없습니다" });
    }
  } else if (guestId) {
    const user = await docData.validUser(guestId);
    const doc = await docData.findByGuest(guestId);
    const docList = doc.map((el) => el.dataValues);
    if (user && docList.length !== 0) {
      const like = await docData.countLike(docList);
      const img = await docData.findByImg(docList);
      console.log(img);
      const key = Object.keys(img);

      for (let i = 0; i < docList.length; i++) {
        for (let j = 0; j < key.length; j++) {
          if (docList[i].id === parseInt(key[j])) {
            docList[i].like = like[docList[j].id] || 0;
            docList[i].img = img[docList[j].id];
          }
        }
      }
      docList.sort((a, b) => b.id - a.id);
      return res.status(200).send({ data: docList });
    } else {
      return res.status(404).send({ message: "해당 포스트가 없습니다" });
    }
  }
  return res.status(404).json({ message: "해당 포스트가 없습니다" });
}
export async function getOne(req, res) {
  const authorization = req.headers.authorization;
  let userId;
  if (!authorization) {
    userId = "guest";
  } else {
    const token = authorization.split(" ")[1];
    if (token === "null") {
      userId = "guest";
    } else {
      try {
        const user = await jwt.verify(token, String(config.jwt.secretKey));
        userId = user.id;
      } catch {
        userId = "guest";
      }
    }
  }
  const docId = parseInt(req.params.docId);

  let doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당 포스트가 없습니다" });
  }
  doc = doc.dataValues;
  const hostUser = await userData.findById(doc.userId);
  const docImgLink = await docData.findByImg([doc]);

  let like;
  if (userId === "guest") {
    like = false;
  } else {
    const likeList = await likeData.findByUserId(userId);
    if (likeList.length === 0) {
      like = false;
    } else {
      likeList.includes(docId) ? (like = true) : (like = false);
    }
  }

  const player = await entryData.findByDocId(docId);
  const board = await boardData.findByDocId(docId);

  if (doc.type === "trade") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        type: doc.type,
        status: doc.status,
        title: doc.title,
        event: doc.event,
        price: doc.price,
        place: doc.place,
        text: doc.text,
        img: docImgLink[docId.toString()],
        like,
      },
    });
  } else if (doc.type === "match") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        type: doc.type,
        status: doc.status,
        title: doc.title,
        event: doc.event,
        place: doc.place,
        text: doc.text,
        img: docImgLink[docId.toString()],
        like,
        player,
      },
    });
  } else if (doc.type === "tournament") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        type: doc.type,
        status: doc.status,
        title: doc.title,
        event: doc.event,
        place: doc.place,
        text: doc.text,
        img: docImgLink[docId.toString()],
        like,
        player,
        board,
      },
    });
  }
}

export async function editDoc(req, res) {
  const userId = req.userId;
  const docId = req.params.docId;
  const host = await docData.findById(docId);
  if (host.userId !== userId) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }
  const hostUser = await userData.findById(host.userId);
  if (!req.body.type) {
    const checkDoc = await docData.findById(docId);
    if (checkDoc.dataValues.type !== "trade" && req.body.price) {
      return res.status(400).json({ message: "잘못된 접근입니다" });
    }
  } else if (req.body.type !== "trade" && req.body.price) {
    return res.status(400).json({ message: "잘못된 접근입니다" });
  }

  const result = await docData.editDoc(docId, req.body);
  const editedDoc = result.dataValues;
  const docImgLink = await docData.findByImg([editedDoc]);

  let like;
  const likeList = await likeData.findByUserId(userId);
  likeList.length === 0 ? (like = false) : (like = true);

  const player = await entryData.findByDocId(docId);
  const board = await boardData.findByDocId(docId);

  if (editedDoc.type === "trade") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        docId: editedDoc.id,
        type: editedDoc.type,
        status: editedDoc.status,
        title: editedDoc.title,
        event: editedDoc.event,
        price: editedDoc.price,
        place: editedDoc.place,
        text: editedDoc.text,
        img: docImgLink[docId.toString()],
        like,
      },
    });
  } else if (editedDoc.type === "match") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        docId: editedDoc.id,
        type: editedDoc.type,
        status: editedDoc.status,
        title: editedDoc.title,
        event: editedDoc.event,
        place: editedDoc.place,
        text: editedDoc.text,
        img: docImgLink[docId.toString()],
        like,
        player,
      },
    });
  } else if (editedDoc.type === "tournament") {
    return res.status(200).json({
      data: {
        userData: {
          userId: hostUser.id,
          nickname: hostUser.nickname,
          img: hostUser.img,
        },
        docId: editedDoc.id,
        type: editedDoc.type,
        status: editedDoc.status,
        title: editedDoc.title,
        event: editedDoc.event,
        place: editedDoc.place,
        text: editedDoc.text,
        img: docImgLink[docId.toString()],
        like,
        player,
        board,
      },
    });
  }
}

export async function create(req, res) {
  const userId = req.userId;
  const hostUser = await userData.findById(userId);

  const created = await docData.create(userId, req.body);
  if (created === "cannot create") {
    return res.status(400).json({ message: "잘못된 접근입니다" });
  }

  const docImgLink = await docData.findByImg([created]);
  let player;
  if (created.type === "match" || created.type === "tournament") {
    player = await entryData.findByDocId(created.id);
  }
  let board;
  if (created.type === "tournament") {
    board = await boardData.findByDocId(created.id);
  }

  return res.status(200).json({
    data: {
      userData: {
        userId: hostUser.id,
        nickname: hostUser.nickname,
        img: hostUser.img,
      },
      docId: created.id,
      type: created.type,
      status: created.status,
      title: created.title,
      event: created.event,
      place: created.place,
      price: created.price,
      text: created.text,
      img: docImgLink[created.id.toString()],
      like: false,
      player,
      board,
    },
  });
}

export async function remove(req, res) {
  const userId = req.userId;
  const docId = req.params.docId;
  const host = await docData.findById(docId);
  if (host && host.userId === userId) {
    await docData.remove(docId);
    return res.sendStatus(204);
  }
  return res.status(403).json({ message: "권한이 없습니다" });
}
