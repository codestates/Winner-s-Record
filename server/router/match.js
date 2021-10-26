import express from 'express';
import 'express-async-errors';
import * as matchController from '../controller/match.js';
import {jwtValidator} from '../middleware/jwt.js';

const router = express.Router();

router.post('/:postId', jwtValidator, matchController.insertResult);

export default router;
