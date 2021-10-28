import express from 'express';
import 'express-async-errors';
import * as docController from '../controller/doc.js';
import {jwtValidator} from '../middleware/jwt.js';

const router = express.Router();

router.get('/', docController.searchDoc);
router.get('/:docId', docController.getOne);
router.put('/:docId', jwtValidator, docController.editDoc);

export default router;
