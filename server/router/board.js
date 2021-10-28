import express from 'express';
import 'express-async-errors';
import * as boardController from '../controller/board.js';
import {jwtValidator} from '../middleware/jwt.js';

const router = express.Router();

router.post('/', jwtValidator, boardController.create);
router.delete('/:boardId', jwtValidator, boardController.remove);

export default router;
