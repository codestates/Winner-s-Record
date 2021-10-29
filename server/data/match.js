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
    winner: newMatch.winner,
    loser: newMatch.loser,
  };
}

export async function eidtMatch(matchId, winner, loser) {
  await db.Matches.update({ winner, loser }, { where: { id: matchId } });
  const editedMatch = await db.Matches.findOne({
    where: { id: matchId },
  });
  return editedMatch;
}

export async function tournamentMatch(docId, event, players) {
  let type;
  if (players.legnth === 8) {
    type = "tournamentR1";
  } else if (players.length === 4) {
    type = "tournamentR2";
  } else if (players.length === 2) {
    type = "tournamentR3";
  }
  players.sort(() => Math.random() - 0.5);
  const binary = [];
  for (let i = 0; i < players.length; i += 2) {
    binary.push(`${players[i]}vs${players[i + 1]}`);
  }
  for (let i = 0; i < binary.length; i++) {
    await db.Matches.create({
      docId,
      event,
      type,
      player: binary[i],
    });
  }
  return binary;
}
