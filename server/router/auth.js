import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import {jwtValidator} from '../middleware/jwt.js';

const router = express.Router();

router.post('/', authController.signup);
router.post('/email', authController.emailValidator);
router.post('/nickname', authController.nicknameValidator);
router.post('/login', authController.login);
router.post('/logout', jwtValidator, authController.logout);
router.post('/password', jwtValidator, authController.passwordValidator);
router.put('/', jwtValidator, authController.edit);
router.put('/img', jwtValidator, authController.editImg);

export default router;
