import "express-async-errors";
import * as matchData from "../data/match.js";
import * as recordData from "../data/records.js";
import * as docData from "../data/doc.js";
import * as userData from "../data/auth.js";

export async function insertResult(req, res) {
  const hostId = req.userId;
  const docId = parseInt(req.params.docId);
  const doc = await matchData.findDocById(docId);
  if (hostId !== doc.userId) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }
  const { winner, loser } = req.body;
  const winnerId = await userData.findByNickname(winner);
  const loserId = await userData.findByNickname(loser);
  const type = doc.type;
  const event = doc.event;
  const result = await matchData.createMatch({
    type,
    event,
    winnerId: winnerId.id,
    loserId: loserId.id,
    docId,
  });
  if (doc.type === "match") {
    await recordData.createRecords({
      event,
      winnerId: winnerId.id,
      loserId: loserId.id,
    });
    await docData.editDoc(docId, { status: "완료" });
    return res.status(200).json({ ...result });
  } else if (doc.type === "tournament") {
    return res.status(200).json({ ...result });
  }
}

export async function editResult(req, res) {
  const hostId = req.userId;
  const matchId = req.body.matchId;
  const docId = parseInt(req.params.docId);
  const doc = await matchData.findDocById(docId);
  if (hostId !== doc.userId) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }
  const { winner, loser } = req.body;
  const winnerId = await userData.findByNickname(winner);
  const loserId = await userData.findByNickname(loser);
  const result = await matchData.eidtMatch(matchId, winnerId.id, loserId.id);
  return res.status(200).json({ ...result });
}
