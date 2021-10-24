import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';

const router = express.Router();

router.post('/', authController.signup);
router.post('/email', authController.emailValidator);
router.post('/nickname', authController.nicknameValidator);

export default router;
