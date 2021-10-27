import 'express-async-errors';
import * as matchData from '../data/match.js';
import * as recordData from '../data/records.js';
import * as userData from '../data/auth.js';

export async function insertResult(req, res) {
  const hostId = req.userId;
  const docId = parseInt(req.params.docId);
  console.log('hostId : ', hostId, 'docId : ', docId);
  const doc = await matchData.findDocById(docId);
  console.log('포스트정보 : ', doc);
  if (hostId !== doc.userId) {
    return res.status(403).json({message: '권한이 없습니다'});
  }
  const {winner, loser} = req.body;
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
  console.log('생성된 매치 : ', result);
  if (doc.type === 'match') {
    await recordData.createRecords({
      event,
      winnerId: winnerId.id,
      loserId: loserId.id,
    });
    return res.status(200).json({result});
  } else if (doc.type === 'tounarment') {
    return res.status(200).json({result});
  }
}
