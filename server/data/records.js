import db from '../models/index.js';

export async function createRecords(result) {
  //result  = {event, winnerId, loserId}
  const winnerRecord = Records.find(
    (el) => el.event === result.event && el.userId === result.winnerId
  );
  const loserRecord = Records.find(
    (el) => el.event === result.event && el.userId === result.loserId
  );
  console.log('winner : ', winnerRecord, '\n', 'looser : ', loserRecord);
  winnerRecord.win += 1;
  winnerRecord.point += 3;
  loserRecord.lose += 1;
  loserRecord.point += 1;

  console.log('winner : ', winnerRecord, '\n', 'looser : ', loserRecord);
  return {winnerRecord, loserRecord};
}
