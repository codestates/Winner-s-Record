import db from "../models/index.js";

export async function findByDocId(docId) {
  const allTournament = await db.Matches.findAll({
    where: { docId },
  });

  const result = allTournament.map((el) => {
    const data = el.dataValues;
    delete data.createdAt;
    delete data.updatedAt;
    return data;
  });
  return result;
}
