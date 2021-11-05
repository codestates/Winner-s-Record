import "express-async-errors";
import * as recordData from "../data/records.js";
import * as matchData from "../data/match.js";
import * as tournamentData from "../data/tournament.js";
import * as docData from "../data/doc.js";

export async function confirm(req, res) {
  const userId = req.userId;
  const docId = req.params.docId;
  let doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({ message: "해당사항을 찾을 수 없습니다" });
  }
  doc = doc.dataValues;

  if (userId !== doc.userId) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }
  const { matchId, event } = req.body;
  //matchId = [11, 12, 13, 14]
  const winners = await recordData.findWinner(matchId);
  console.log(winners);

  if (winners.length !== 1) {
    const binary = await matchData.tournamentMatch(docId, event, winners);
    console.log(binary);
  } else if (winners.length === 1) {
    await docData.editDoc(docId, { status: "완료" });
  }
  const result = await tournamentData.findByDocId(docId);
  return res.status(200).json({ data: result, hostId: doc.userId });
}
