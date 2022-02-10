import express from "express";
import "express-async-errors";
import * as docController from "../controller/doc.js";
import { jwtValidator } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", docController.searchDoc);
router.get("/:docId", docController.getOne);
router.post("/", jwtValidator, docController.create);
router.put("/:docId", jwtValidator, docController.editDoc);
router.delete("/:docId", jwtValidator, docController.remove);

export default router;
