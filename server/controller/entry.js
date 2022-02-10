import "express-async-errors";
import * as entryData from "../data/entry.js";
import * as docData from "../data/doc.js";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export async function addEntry(req, res) {
  const docId = req.params.docId;
  const authorization = req.headers.authorization;

  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당 사항을 찾을 수 없습니다" });
  }

  if (!authorization) {
    return res.status(403).json({ message: "권한이 없습니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.addPostEntry(user.id, docId);
    if (user && !entryPost) {
      return res.status(400).json({ message: "이미 신청한 사용자입니다" });
    }
    if (entryPost && user) {
      const entryUser = await entryData.entryList(docId, entryPost);
      return res.status(200).json({ data: entryUser });
    } else {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
  }
}

export async function entryList(req, res) {
  const docId = req.params.docId;
  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당 사항을 찾을 수 없습니다" });
  }
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({ message: "권한이 없습니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryList = await entryData.getEntryList(docId);
    if (entryList && user) {
      const entryUser = await entryData.entryList(docId, entryList);
      const docType = await entryData.findDocStatus(docId);
      const docEvent = await entryData.findDocEvent(docId);
      return res
        .status(200)
        .json({ doctype: docType, docevent: docEvent, data: entryUser });
    } else {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
  }
}

export async function deleteEntry(req, res) {
  const docId = req.params.docId;
  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }
  const authorization = req.headers.authorization;
  const userId = req.body.userId;
  if (!authorization) {
    return res.status(403).json({ message: "권한이 없습니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.deleteEntryPost(user.id, docId, userId);
    if (entryPost && user) {
      const entryUser = await entryData.entryList(docId, entryPost);
      return res.status(200).json({ data: entryUser });
    } else {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
  }
}

export async function changeStatus(req, res) {
  const docId = req.params.docId;
  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }
  const authorization = req.headers.authorization;
  const userId = req.body.userId;
  if (!authorization) {
    return res.status(403).json({ message: "권한이 없습니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.changeEntryStatus(user.id, docId, userId);
    if (entryPost && user) {
      const entryUser = await entryData.entryList(docId, entryPost);
      return res.status(200).json({ data: entryUser });
    } else {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
  }
}
