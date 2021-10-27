import 'express-async-errors';
import * as matchData from '../data/match.js';
import * as recordData from '../data/records.js';
import * as userData from '../data/auth.js';
import * as postData from '../data/doc.js';

export async function insertResult(req, res) {
  const hostId = req.userId;
  const postId = parseInt(req.params.postId);
  const post = await postData.findById(postId);
  if (hostId !== post.userId) {
    return res.status(403).json({message: '권한이 없습니다'});
  }
  const {winner, loser} = req.body;
  const winnerId = await userData.findByNickname(winner);
  const loserId = await userData.findByNickname(loser);
  const type = post.type;
  const event = post.event;
  const result = await matchData.createMatch({
    type,
    event,
    winnerId: winnerId.id,
    loserId: loserId.id,
    postId,
  });
  if (post.type === 'match') {
    const record = await recordData.createRecords({
      event,
      winnerId: winnerId.id,
      loserId: loserId.id,
    });
    return res.status(200).json({result});
  } else if (post.type === 'tounarment') {
    return res.status(200).json({result});
  }
}
