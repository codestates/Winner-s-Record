import db from "../models/index.js";
import * as userData from "../data/auth.js";

export async function updateRecords(result) {
  const { event, winner, loser } = result;

  const winnerData = await userData.findByNickname(winner);
  const loserData = await userData.findByNickname(loser);

  const winnerId = winnerData.id;
  const loserId = loserData.id;

  const winnerRecord = await db.Records.findOne({
    where: { event, userId: winnerId },
  }).then((data) => data.dataValues);
  const loserRecord = await db.Records.findOne({
    where: { event, userId: loserId },
  }).then((data) => data.dataValues);

  await db.Records.update(
    { win: `${winnerRecord.win + 1}` },
    { where: { userId: winnerId, event } }
  );
  await db.Records.update(
    { point: `${winnerRecord.point + 3}` },
    { where: { userId: winnerId, event } }
  );
  await db.Records.update(
    { lose: `${loserRecord.lose + 1}` },
    { where: { userId: loserId, event } }
  );
  await db.Records.update(
    { point: `${loserRecord.point + 1}` },
    { where: { userId: loserId, event } }
  );

  const editedWinnerRecord = await db.Records.findOne({
    where: { userId: winnerId, event },
  }).then((data) => data.dataValues);
  const editedLoserRecord = await db.Records.findOne({
    where: { userId: loserId, event },
  }).then((data) => data.dataValues);
  console.log(editedWinnerRecord, editedLoserRecord);
  return { editedWinnerRecord, editedLoserRecord };
}

export async function create(userId) {
  await db.Records.create({
    event: "tennis",
    win: 0,
    lose: 0,
    point: 0,
    userId,
  });
  await db.Records.create({
    event: "badminton",
    win: 0,
    lose: 0,
    point: 0,
    userId,
  });
  await db.Records.create({
    event: "squash",
    win: 0,
    lose: 0,
    point: 0,
    userId,
  });
  await db.Records.create({
    event: "pingpong",
    win: 0,
    lose: 0,
    point: 0,
    userId,
  });
}

export async function findWinner(matchId) {
  let winners = [];
  for (let i = 0; i < matchId.length; i++) {
    const result = await db.Matches.findOne({
      where: { id: matchId[i] },
    }).then((data) => data.dataValues);
    winners.push(result.winner);
    await updateRecords({
      event: result.event,
      winner: result.winner,
      loser: result.loser,
    });
  }
  return winners;
}
