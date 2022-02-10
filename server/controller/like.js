import "express-async-errors";
import jwt from "jsonwebtoken";
import * as likeData from "../data/like.js";
import * as docData from "../data/doc.js";
import { config } from "../config.js";

export async function searchLike(req, res) {
  const id = req.params.id;
  const ids = await likeData.validId(id);
  if (ids !== null) {
    const docs = await likeData.findById(id);
    if (docs.length !== 0) {
      return res.status(200).send({ data: docs });
    } else {
      return res.status(404).send({ message: "해당사항을 찾을 수 없습니다" });
    }
  } else {
    return res.status(404).send({ message: "해당사항을 찾을 수 없습니다" });
  }
}

export async function addLike(req, res) {
  const docId = req.body.docId;
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "로그인이 필요한 기능입니다" });
  } else {
    const token = authorization.split(" ")[1];
    let user;
    try {
      user = await jwt.verify(token, String(config.jwt.secretKey));
    } catch {
      return res.status(401).send({ message: "로그인이 필요한 기능입니다" });
    }
    const likeDoc = await likeData.addLikeDoc(user.id, docId);
    if (user && likeDoc) {
      return res.status(201).send({ likeId: likeDoc.id });
    }
  }
}

export async function deleteLike(req, res) {
  const docId = req.body.docId;
  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "로그인이 필요한 기능입니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const deleteDoc = await likeData.deleteLikeDoc(user.id, docId);
    if (user && deleteDoc === "ok") {
      return res.sendStatus(204);
    } else {
      return res.status(401).send({ message: "로그인이 필요한 기능입니다" });
    }
  }
}
