import express from 'express';
import 'express-async-errors';
import * as postController from '../controller/post.js';

const router = express.Router();

router.get('/', postController.searchPost);
router.get('/:postId', postController.getOne);

export default router;
