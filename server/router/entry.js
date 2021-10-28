import express from 'express';
import 'express-async-errors';
import * as entryController from '../controller/entry.js';

const router = express.Router();

router.post('/:docId', entryController.addEntry);
router.get('/:docId', entryController.entryList);
router.delete('/:docId', entryController.deleteEntry);
router.put('/:docId', entryController.changeStatus);

export default router;