import Sequelize from 'sequelize';
import db from '../models/index.js';
const Op = Sequelize.Op;

export async function findByDocId(docId) {
  const allBoard = await db.Docs_Boards.findAll({
    attributes: ['boardId'],
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
      attributes: ['userId', 'text'],
      where: {id: boardId[i]},
    }).then((data) => data.dataValues);
    board.push(text);
  }
  return board;

  // const board = allBoardId.map((el) => {
  //   return db.Boards.find((el2) => el2.id === el);
  // });
  // return board;
}
