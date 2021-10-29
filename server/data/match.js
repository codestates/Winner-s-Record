import db from "../models/index.js";

export async function findDocById(id) {
  try {
    return db.Docs.findOne({
      where: { id },
    }).then((data) => data.dataValues);
  } catch {
    return null;
  }
}

export async function createMatch(result) {
  const newMatch = await db.Matches.create(result).then(
    (data) => data.dataValues
  );
  return {
    matchId: newMatch.id,
    winnerId: newMatch.winnerId,
    loserId: newMatch.loserId,
  };
}

export async function eidtMatch(matchId, winnerId, loserId) {
  await db.Matches.update({ winnerId, loserId }, { where: { id: matchId } });
  const editedMatch = await db.Matches.findOne({
    where: { id: matchId },
  });
  return {
    matchId: editedMatch.id,
    winnerId: editedMatch.winnerId,
    loserId: editedMatch.loserId,
  };
}

export async function tournamentMatch(docId, event, players) {
  players.sort(() => Math.random() - 0.5);
  const binary = [];
  for (let i = 0; i < players.length; i += 2) {
    binary.push(`${players[i]}vs${players[i + 1]}`);
  }
  for (let i = 0; i < binary.length; i++) {
    await db.Matches.create({
      docId,
      event,
      type: "tournamentR1",
      player: binary[i],
    });
  }
  return binary;
}
