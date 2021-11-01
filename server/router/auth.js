import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import { jwtValidator } from "../middleware/jwt.js";

const router = express.Router();

router.get("/me", jwtValidator, authController.me);
router.get("/:userId", authController.userInfo);
router.post("/", authController.signup);
router.post("/social", authController.socialSignUp);
router.post("/email", authController.emailValidator);
router.post("/nickname", authController.nicknameValidator);
router.post("/login", authController.login);

//kakao
// router.get("/kakao/login", authController.kakaoLogin);
router.get("/kakao/callback", authController.kakaoCallback);

router.post("/password", jwtValidator, authController.passwordValidator);
router.put("/", jwtValidator, authController.edit);
router.put("/img", jwtValidator, authController.editImg);
router.delete("/", jwtValidator, authController.remove);

export default router;
