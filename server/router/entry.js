import express from 'express';
import 'express-async-errors';
import * as entryController from '../controller/entry.js';

const router = express.Router();

router.get('/:postId', entryController.addEntry);
router.delete('/:postId', entryController.deleteEntry);
router.put('/:postId', entryController.changeStatus);

export default router;