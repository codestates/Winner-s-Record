import "express-async-errors";
import * as matchData from "../data/match.js";
import * as recordData from "../data/records.js";
import * as docData from "../data/doc.js";
import * as userData from "../data/auth.js";
import db from "../models/index.js";

export async function insertResult(req, res) {
  const hostId = req.userId;
  const docId = parseInt(req.params.docId);
  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }
  if (doc.dataValues.status === "완료") {
    return res.status(400).json({ message: "잘못된 접근입니다" });
  }

  const docdata = await docData.findById(docId);
  if (!docdata) {
    return res.status(400).json({ message: "잘못된 접근입니다" });
  }
  if (hostId !== docdata.dataValues.userId) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }
  const { winner, loser } = req.body;
  const winnerData = await userData.findByNickname(winner);
  const loserData = await userData.findByNickname(loser);
  const winnerId = winnerData.id;
  const loserId = loserData.id;
  const event = docdata.event;

  const result = await matchData.createMatch({
    type: "match",
    event,
    winner: winnerId,
    loser: loserId,
    player: `${winner}vs${loser}`,
    docId,
  });

  await recordData.updateRecords({
    event,
    winner,
    loser,
  });
  await docData.editDoc(docId, { status: "완료" });
  return res.status(201).json({ ...result });
}

export async function headToHead(req, res) {
  const userId = req.userId;
  const nickname = req.query.nickname;
  const event = req.query.event;
  const rival = await userData.findByNickname(nickname);
  if (!rival) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }

  const data = await matchData.findHeadToHead(event, userId, rival.id);
  let win = 0;
  let lose = 0;
  data.forEach((el) => {
    el.winner === userId ? win++ : lose++;
  });
  return res.status(200).json({ win, lose });
}

export async function myMatch(req, res) {
  const userId = req.query.userId;
  const myMatch = await matchData.myMatch(userId);
  return res.status(200).json({ myMatch });
}
