import express from 'express';
import 'express-async-errors';
import * as rankController from '../controller/rank.js';

const router = express.Router();

router.get('/', rankController.searchRank);

export default router;