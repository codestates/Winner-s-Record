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
  const event = doc.event;

  const result = await matchData.createMatch({
    type: "match",
    event,
    winner,
    loser,
    player: `${winner}vs${loser}`,
    docId,
  });

  await recordData.updateRecords({
    event,
    winner,
    loser,
  });
  await docData.editDoc(docId, { status: "완료" });
  return res.status(200).json({ ...result });
}
