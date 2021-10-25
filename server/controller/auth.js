import 'express-async-errors';
import bcrypt from 'bcrypt';
import * as userData from '../data/auth.js';
import * as imgData from '../data/img.js';
import * as jwtFunc from '../middleware/jwt.js';
import {config} from '../config.js';

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

export async function passwordValidator(req, res) {
  const userId = req.userId;
  const password = req.body.password;
  console.log(userId, password);
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(404).json({message: '해당 유저가 존재하지 않습니다'});
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({message: '이메일이나 비밀번호가 틀립니다'});
  }
  return res.status(200).json({userId: user.id});
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
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt.saltRounds)
  );
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
  const user = await userData.findByEmail(email);
  if (!user) {
    return res.status(400).json({message: '이메일이나 비밀번호가 틀립니다'});
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({message: '이메일이나 비밀번호가 틀립니다'});
  }
  delete user.password;

  const imgLink = await imgData.findById(user.img);
  const token = jwtFunc.createToken(user);
  res.status(200).json({
    token,
    userdata: {
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
      img: imgLink,
    },
  });
}

export async function logout(req, res) {
  const user = await userData.findById(req.userId);
  if (user) {
    res.status(200).json({message: '로그아웃 성공'});
  } else {
    res.status(401).json({message: '로그아웃 실패'});
  }
}

export async function edit(req, res) {
  const {nickname, password} = req.body;
  const userId = req.userId;
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(400).json({message: '회원정보 수정 실패'});
  }
  if (nickname === null && password === null) {
    return res.status(400).json({message: '회원정보 수정 실패'});
  }
  let editedUser;
  if (password === null) {
    editedUser = await userData.editNickname(userId, nickname);
  } else if (nickname === null) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt.saltRounds)
    );
    editedUser = await userData.editPassword(userId, hashedPassword);
  } else {
    editedUser = await userData.editNickname(userId, nickname);
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt.saltRounds)
    );
    editedUser = await userData.editPassword(editedUser.id, hashedPassword);
  }
  delete editedUser.password;

  const token = jwtFunc.createToken(editedUser);
  const imgLink = await imgData.findById(editedUser.img);

  res.status(200).json({
    token,
    userdata: {
      email: editedUser.email,
      nickname: editedUser.nickname,
      img: imgLink,
    },
  });
}

export async function editImg(req, res) {
  const img = req.img;
  const imgId = imgData.createImg(img);
  const userId = req.userId;
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(400).json({message: '회원정보 수정 실패'});
  }
  const editedUser = await userData.editImg(userId, imgId);
  delete editedUser.password;

  const token = jwtFunc.createToken(editedUser);
  const imgLink = await imgData.findById(editedUser.img);

  res.status(200).json({
    token,
    userdata: {
      email: editedUser.email,
      nickname: editedUser.nickname,
      img: imgLink,
    },
  });
}

export async function remove(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({message: '회원탈퇴 실패'});
  }
  userData.remove(userId);
  return res.sendStatus(204);
}
