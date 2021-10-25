import express from 'express';
import 'express-async-errors';
import * as likeController from '../controller/like.js';

const router = express.Router();

router.get('/:id', likeController.searchLike);
router.post('/', likeController.addLike);
router.delete('/', likeController.deleteLike);

export default router;