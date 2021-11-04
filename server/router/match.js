import express from "express";
import "express-async-errors";
import * as matchController from "../controller/match.js";
import { jwtValidator } from "../middleware/jwt.js";

const router = express.Router();

router.post("/:docId", jwtValidator, matchController.insertResult);
router.get("/", jwtValidator, matchController.headToHead);

export default router;
