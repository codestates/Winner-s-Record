import express from 'express';
import 'express-async-errors';
import * as docController from '../controller/doc.js';

const router = express.Router();

router.get('/', docController.searchDoc);
router.get('/:docId', docController.getOne);

export default router;
