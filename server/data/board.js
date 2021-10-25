import postsBoards from './dummy/Posts_Boards.js';
import Boards from './dummy/Boards.js';

export async function findByPostId(postId) {
  console.log('보드찾기 postId : ', postId);
  const allBoard = postsBoards.filter((el) => el.PostId === postId);
  console.log('aaaa', allBoard);
  const allBoardId = allBoard.map((el) => {
    return el.BoardId;
  });
  const board = allBoardId.map((el) => {
    return Boards.find((el2) => el2.id === el);
  });
  return board;
}
