import express from 'express';
import 'express-async-errors';
import * as entryController from '../controller/entry.js';

const router = express.Router();

router.get('/:docId', entryController.addEntry);
router.delete('/:docId', entryController.deleteEntry);
router.put('/:docId', entryController.changeStatus);

export default router;