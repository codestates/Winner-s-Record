import "express-async-errors";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import * as userData from "../data/auth.js";
import * as recordData from "../data/records.js";
import * as jwtFunc from "../middleware/jwt.js";
import { config } from "../config.js";

export async function me(req, res) {
  const userId = req.userId;
  const user = await userData.findById(userId);
  return res.status(200).json({
    userId: user.id,
    nickname: user.nickname,
    img: user.img,
    type: user.type,
  });
}

export async function userInfo(req, res) {
  const userId = req.params.userId;
  const authorization = req.headers.authorization;
  let token;
  if (authorization) {
    token = authorization.split(" ")[1];
  }
  const profile = await userData.findById(userId);
  if (!authorization || token === "null") {
    if (profile) {
      return res.status(200).json({
        profileData: {
          userId: profile.id,
          nickname: profile.nickname,
          img: profile.img,
        },
      });
    } else {
      return res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
  jwt.verify(token, String(config.jwt.secretKey), async (error, data) => {
    if (error) {
      return res.status(403).json({ message: "권한이 없습니다" });
    }
    const user = await userData.findById(data.id);
    return res.status(200).json({
      profileData: {
        userId: profile.id,
        nickname: profile.nickname,
        img: profile.img,
      },
      userData: { userId: user.id, nickname: user.nickname, img: user.img },
    });
  });
}

export async function emailValidator(req, res) {
  const email = req.body.email;
  const already = await userData.findByEmail(email);
  if (already) {
    return res.status(409).json({ message: "이미 존재하는 이메일 입니다" });
  }
  return res.status(200).json({ message: "사용 가능한 이메일 입니다" });
}

export async function nicknameValidator(req, res) {
  const nickname = req.body.nickname;
  const already = await userData.findByNickname(nickname);
  if (already) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다" });
  }
  return res.status(200).json({ message: "사용 가능한 닉네임입니다" });
}

export async function passwordValidator(req, res) {
  const userId = req.userId;
  const password = req.body.password;
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "해당 유저가 존재하지 않습니다" });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({ message: "이메일이나 비밀번호가 틀립니다" });
  }
  return res.status(200).json({ userId: user.id });
}

export async function signup(req, res) {
  const { email, nickname, password, type } = req.body;
  if (
    email === undefined ||
    nickname === undefined ||
    password === undefined ||
    type === undefined
  ) {
    return res.status(400).json({ message: "회원가입 실패" });
  }

  const imgLink = await userData.randomUserImg([1, 2, 3, 4, 5, 6, 7, 8]);
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt.saltRounds)
  );
  const userId = await userData.createUser({
    email,
    password: hashedPassword,
    nickname,
    type,
    img: imgLink,
  });
  if (userId === "not web signup") {
    return res.status(400).json({ message: "잘못된 접근입니다" });
  }

  await recordData.create(userId);

  return res.status(201).json({ userId });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userData.findByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "이메일이나 비밀번호가 틀립니다" });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(400).json({ message: "이메일이나 비밀번호가 틀립니다" });
  }
  delete user.password;

  const token = jwtFunc.createToken(user);
  res.status(200).json({
    token,
    userdata: {
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
      img: user.img,
    },
  });
}

// export async function kakaoLogin(req, res) {
//   console.log("카카오로그인 요청");
//   // 로그인 버튼
//   //`https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientId}&redirect_uri=${config.kakao.redirectUrl}&&response_type=code`
//   return res.redirect(
//     `https://kauth.kakao.com/oauth/authorize?client_id=42184b4ebbf71c527914d5cf6269aae0&redirect_uri=http://localhost:8080/auth/kakao/callback&&response_type=code`
//   );
// }

export async function kakaoCallback(req, res) {
  const token1 = req.query.token;
  const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${token1}`,
    },
  });

  let user = await userData.findByKakaoId(userInfo.data.id);
  if (!user) {
    res.status(200).json({
      type: "kakao",
      id: userInfo.data.id,
    });
  }
  const token = jwtFunc.createToken(user);
  return res.status(200).json({
    token,
    userdata: {
      userId: user.id,
      nickname: user.nickname,
      img: user.img,
      type: user.type,
    },
  });
}

export async function socialSignUp(req, res) {
  const { id, type, nickname } = req.body;
  if (id === undefined || type === undefined || nickname === undefined) {
    return res.status(400).json({ message: "회원가입 실패" });
  }
  const user = await userData.createSocialUser(id, nickname, type);

  await recordData.create(user.id);

  const token = jwtFunc.createToken(user);
  return res.status(200).json({
    token,
    userdata: {
      userId: user.id,
      nickname: user.nickname,
      img: user.img,
      type: user.type,
    },
  });
}

export async function edit(req, res) {
  const { nickname, password } = req.body;
  const userId = req.userId;
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "회원정보 수정 실패" });
  }
  if (nickname === null && password === null) {
    return res.status(400).json({ message: "회원정보 수정 실패" });
  }
  let editedUser;
  if (password === null) {
    editedUser = await userData.editNickname(user.id, nickname);
  } else if (nickname === null) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt.saltRounds)
    );
    editedUser = await userData.editPassword(user.id, hashedPassword);
  } else {
    editedUser = await userData.editNickname(user.id, nickname);
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt.saltRounds)
    );
    editedUser = await userData.editPassword(editedUser.id, hashedPassword);
  }
  delete editedUser.password;

  const token = jwtFunc.createToken(editedUser);

  res.status(200).json({
    token,
    userdata: {
      email: editedUser.email,
      nickname: editedUser.nickname,
      img: editedUser.img,
    },
  });
}

export async function editImg(req, res) {
  const img = req.body.img;
  const userId = req.userId;
  const user = await userData.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "회원정보 수정 실패" });
  }
  const editedUser = await userData.editImg(userId, img);
  delete editedUser.password;

  const token = jwtFunc.createToken(editedUser);

  res.status(200).json({
    token,
    userdata: {
      userId: editedUser.id,
      email: editedUser.email,
      nickname: editedUser.nickname,
      img: editedUser.img,
    },
  });
}

export async function remove(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "회원탈퇴 실패" });
  }
  userData.remove(userId);
  return res.sendStatus(204);
}
