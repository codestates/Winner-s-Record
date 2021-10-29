import express from "express";
import "express-async-errors";
import * as tournamentController from "../controller/tournament.js";

const router = express.Router();

router.get("/:docId", tournamentController.getAll);

export default router;
