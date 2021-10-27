import db from '../models/index.js';

export async function createMatch(result) {
  const newMatch = {
    id: Matches.length + 1,
    ...result,
  };
  Matches.push(newMatch);
  console.log(Matches);
  return {
    matchId: newMatch.id,
    winnerId: newMatch.winnerId,
    loserId: newMatch.loserId,
  };
}
