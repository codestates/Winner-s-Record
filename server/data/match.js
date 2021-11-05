import pkg from "sequelize";
import db from "../models/index.js";
const { Op } = pkg;

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
  if (players.length === 8) {
    type = "tournamentR1";
  } else if (players.length === 4) {
    type = "tournamentR2";
  } else if (players.length === 2) {
    type = "tournamentR3";
  }
  console.log(type);
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

export async function findHeadToHead(event, user, rival) {
  const matchData1 = await db.Matches.findAll({
    where: { event, winner: user, loser: rival },
  });
  const matchData2 = await db.Matches.findAll({
    where: { event, winner: rival, loser: user },
  });
  const result = [];

  for (let i = 0; i < matchData1.length; i++) {
    const match = {
      id: matchData1[i].dataValues.id,
      winner: matchData1[i].dataValues.winner,
      loser: matchData1[i].dataValues.loser,
    };
    result.push(match);
  }
  for (let i = 0; i < matchData2.length; i++) {
    const match = {
      id: matchData2[i].dataValues.id,
      winner: matchData2[i].dataValues.winner,
      loser: matchData2[i].dataValues.loser,
    };
    result.push(match);
  }
  result.sort((a, b) => b.id - a.id);

  return result;
}

export async function myMatch(nickname) {
  const matchData = await db.Matches.findAll({
    where: {
      [Op.or]: [
        {
          winner: nickname,
        },
        {
          loser: nickname,
        },
      ],
    },
  });
  const myMatch = matchData.map((el) => {
    let date = el.dataValues.createdAt.toString();

    return {
      event: el.dataValues.event,
      winner: el.dataValues.winner,
      loser: el.dataValues.loser,
      date,
    };
  });
  return myMatch;
}
