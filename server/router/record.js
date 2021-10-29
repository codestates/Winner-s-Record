import express from "express";
import "express-async-errors";
import * as recordController from "../controller/record.js";
import { jwtValidator } from "../middleware/jwt.js";

const router = express.Router();

router.post("/:docId", jwtValidator, recordController.confirm);

export default router;
