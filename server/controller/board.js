import "express-async-errors";
import * as boardData from "../data/board.js";

export async function create(req, res) {
  const userId = req.userId;
  const docId = req.body.docId;
  const text = req.body.text;
  const entryCheck = await boardData.isEntry(docId, userId);
  if (!entryCheck) {
    return res.status(403).json({ message: "권한이 없습니다" });
  }

  const result = await boardData.create(docId, userId, text);
  if (result) {
    return res.status(201).json({ board: result });
  } else {
    return res.status(400).json({ message: "잘못된 요청입니다" });
  }
}
export async function remove(req, res) {
  const userId = req.userId;
  const boardId = req.params.boardId;
  const hostCheck = await boardData.isHost(boardId, userId);

  if (hostCheck) {
    await boardData.remove(boardId);
    return res.sendStatus(204);
  } else {
    const authCheck = await boardData.isAuth(boardId, userId);
    if (!authCheck) {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
    await boardData.remove(boardId);
    return res.sendStatus(204);
  }
}
