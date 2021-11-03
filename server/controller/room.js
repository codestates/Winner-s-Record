import "express-async-errors";
import jwt from "jsonwebtoken";
import * as roomData from "../data/room.js";
import { config } from "../config.js";

export async function createRoom(req, res) {
  const docId = req.body.docId
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(403)
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const checkRoom = await roomData.validRoom(docId, user.id)
    if(checkRoom === null) {
      const createRoom = await roomData.createRoom(docId, user.id)
      return res.status(201).send({id: createRoom})
    } else if(checkRoom.dataValues) {
      const validRoom = await roomData.checkRoom(docId, user.id)
      return res.status(201).send({id: validRoom})
    } else {
      return res.status(403).send({message: "권한이 없습니다"})
    }
  }
}

export async function deleteRoom(req, res) {
  const roomId = req.params.roomId
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).send({message: "권한이 없습니다"})
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
    return res.status(403).send({ message: "권한이 없습니다" });
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
  const docId = req.body.docId
  const roomId = req.params.roomId
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(403).send({message: "권한이 없습니다"})
  } else {
    const token = authorization.split(" ")[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    if(docId !== null && user) {
      const validUser = await roomData.chatUser(user.id, roomId, docId)
      const chatting = await roomData.chattings(roomId, user.id)
      if(validUser !== undefined && chatting !== undefined) {
        return res.status(200).send({data: chatting.data, userData:chatting.userData, docData: validUser})
      } else {
        return res.status(403).send({message: "권한이 없습니다"})
      }
    } else if(docId === null && user) {
      const chattings = await roomData.chattings(roomId, user.id)
      return res.status(200).send({data: chattings.data, userData:chattings.userData})
    } else {
      return res.status(403).send({message: "권한이 없습니다"})
    }
  }
}