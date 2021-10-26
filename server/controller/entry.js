import 'express-async-errors';
import * as entryData from '../data/entry.js';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

export async function addEntry (req, res) {
  const postId = req.params.postId
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(403).send({message: '권한이 없습니다'})
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.addPostEntry(user.id, postId)
    if(entryPost && user) {
      const entryUser = await entryData.entryList(postId, entryPost)
      return res.status(200).send({data: entryUser})
    } else {
      return res.status(403).send({message: '권한이 없습니다'})
    }
  }
} 

export async function deleteEntry (req, res) {
  const postId = req.params.postId
  const authorization = req.headers.authorization
  const userId = req.body.userId
  if(!authorization) {
    return res.status(403).send({message: '권한이 없습니다'})
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.deleteEntryPost(user.id, postId, userId)
    if(entryPost && user) {
      const entryUser = await entryData.entryList(postId, entryPost)
      return res.status(200).send({data: entryUser})
    } else {
      return res.status(403).send({message: '권한이 없습니다'})
    }
  }
}

export async function changeStatus (req, res) {
  const postId = req.params.postId
  const authorization = req.headers.authorization
  const userId = req.body.userId
  if(!authorization) {
    return res.status(403).send({message: '권한이 없습니다'})
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const entryPost = await entryData.changeEntryStatus(user.id, postId, userId)
    if(entryPost && user) {
      const entryUser = await entryData.entryList(postId, entryPost)
      return res.status(200).send({data: entryUser})
    } else {
      return res.status(403).send({message: '권한이 없습니다'})
    }
  }
}