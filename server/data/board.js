import db from '../models/index.js';

export async function findByPostId(postId) {
  console.log('보드찾기 postId : ', postId);
  const allBoard = db.Docs_boards.filter((el) => el.PostId === postId);
  console.log('aaaa', allBoard);
  const allBoardId = allBoard.map((el) => {
    return el.BoardId;
  });
  const board = allBoardId.map((el) => {
    return db.Boards.find((el2) => el2.id === el);
  });
  return board;
}
