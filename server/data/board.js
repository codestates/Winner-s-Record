import Sequelize from "sequelize";
import db from "../models/index.js";
const Op = Sequelize.Op;

export async function findByDocId(docId) {
  const allBoard = await db.Docs_Boards.findAll({
    attributes: ["boardId"],
    where: {
      docId,
    },
  });
  const boardId = allBoard.map((el) => {
    return el.dataValues.boardId;
  });

  const board = [];
  for (let i = 0; i < boardId.length; i++) {
    let text = await db.Boards.findOne({
      attributes: ["userId", "text"],
      where: { id: boardId[i] },
    }).then((data) => data.dataValues);
    board.push(text);
  }
  const users = board.map((el) => el.userId);
  const userData = [];
  for (let i = 0; i < users.length; i++) {
    let data = await db.Users.findOne({
      attributes: ["nickname", "img"],
      where: { id: users[i] },
    }).then((data) => data.dataValues);
    userData.push(data);
  }

  for (let i = 0; i < board.length; i++) {
    Object.assign(board[i], userData[i]);
  }

  return board;
}

export async function isEntry(docId, userId) {
  const user = await db.Entries.findOne({
    where: { docId, userId },
  });
  let result;
  user ? (result = true) : (result = false);
  return result;
}

export async function isAuth(boardId, userId) {
  const board = await db.Boards.findOne({
    where: { id: boardId, userId },
  });
  let result;
  board ? (result = true) : (result = false);
  return result;
}

export async function create(docId, userId, text) {
  const created = await db.Boards.create({
    userId,
    text,
  });
  await db.Docs_Boards.create({
    docId,
    boardId: created.dataValues.id,
  });
  return created.dataValues.id;
}

export async function remove(boardId) {
  await db.Boards.destroy({
    where: { id: boardId },
  });
}
