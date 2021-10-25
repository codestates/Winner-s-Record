import 'express-async-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userData from '../data/auth.js';
import * as jwtFunc from '../middleware/jwt.js';

//.env
const BCRYPT_SALT_ROUNDS = 12;

export async function emailValidator(req, res) {
  const email = req.body.email;
  const already = await userData.findByEmail(email);
  if (already) {
    return res.status(409).json({message: '이미 존재하는 이메일 입니다'});
  }
  return res.status(200).json({message: '사용 가능한 이메일 입니다'});
}

export async function nicknameValidator(req, res) {
  const nickname = req.body.nickname;
  const already = await userData.findByNickname(nickname);
  if (already) {
    return res.status(409).json({message: '이미 존재하는 닉네임입니다'});
  }
  return res.status(200).json({message: '사용 가능한 닉네임입니다'});
}

export async function signup(req, res) {
  const {email, nickname, password, type} = req.body;
  if (
    email === undefined ||
    nickname === undefined ||
    password === undefined ||
    type === undefined
  ) {
    return res.status(400).json({message: '회원가입 실패'});
  }
  const userImg = [1, 2, 3, 4, 5, 6, 7, 8];
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const userId = await userData.createUser({
    email,
    password: hashedPassword,
    nickname,
    type,
    img: userImg[Math.floor(Math.random() * userImg.length)],
  });
  return res.status(201).json({userId});
}

export async function login(req, res) {
  const {email, password} = req.body;
  console.log(email, password);
  const user = await userData.findByEmail(email);
  console.log(user);
  if (!user) {
    return res.status(400).json({message: '이메일이나 비밀번호가 틀립니다'});
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  console.log(passwordCheck);
  if (!passwordCheck) {
    return res.status(400).json({message: '이메일이나 비밀번호가 틀립니다'});
  }
  delete user.password;
  const token = jwtFunc.createToken(user);
  res.status(200).json({
    token,
    userdata: {email: user.email, nickname: user.nickname, img: user.img},
  });
}
