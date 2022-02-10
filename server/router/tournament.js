import express from "express";
import "express-async-errors";
import * as tournamentController from "../controller/tournament.js";
import { jwtValidator } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:docId", tournamentController.getAll);
router.put("/:docId", jwtValidator, tournamentController.editResult);

export default router;
