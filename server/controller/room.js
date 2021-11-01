import "express-async-errors";
import jwt from "jsonwebtoken";
import * as roomData from "../data/room.js";
import { config } from "../config.js";

export async function createRoom(req, res) {
  res.status(200).send('abdsabd')
}

export async function deleteRoom(req, res) {
  const roomId = req.params.roomId
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({message: "권한이 없습니다"})
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const validUser = await roomData.validUser(roomId, user.id)
    if(validUser) {
      const deleteRoom = await roomData.deleteRoom(roomId, user.id)
      if(deleteRoom === 'ok') {
        res.sendStatus(204)
      } else {
        res.status(403).send({ message: "권한이 없습니다"})
      }
    }
  }
}

export async function chattingList(req, res) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "권한이 없습니다" });
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const chatting = await roomData.chatList(user.id)
    if(user && chatting) {
      return res.status(200).send({data: chatting})
    } else {
      return res.status(403).send({message: '권한이 없습니다'})
    }
  }
}

export async function chatSomeone(req, res) {
  res.status(200).send('sd')
}