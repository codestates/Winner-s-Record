import express from "express";
import "express-async-errors";
import * as roomController from "../controller/room.js";

const router = express.Router();

router.post("/", roomController.createRoom);
router.delete("/:roomId", roomController.deleteRoom);
router.get("/", roomController.chattingList);
router.post("/:roomId", roomController.chatSomeone);

export default router;