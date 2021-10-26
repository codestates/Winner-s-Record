import 'express-async-errors';
import jwt from 'jsonwebtoken';
import * as likeData from '../data/like.js';
import {config} from '../config.js';

export async function searchLike (req, res) {
  const id = req.params.id
  const ids = await likeData.validId(id)
  if(ids) {
    const like = await likeData.findById(id)
    return res.status(200).send({data: like})
  } else {
    return res.status(404).send({message: '해당 포스트가 없습니다'})
  }
}

export async function addLike (req, res) {
  const postId = req.body.postId
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(401).send({message: '로그인이 필요한 기능입니다'})
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const likePost = await likeData.addLikePost(user.id, postId)
    if(user && likePost) {
      return res.status(200).send({likeId: likePost.id})
    } else {
      return res.status(401).send({message: '로그인이 필요한 기능입니다'})
    }
  }
}

export async function deleteLike (req, res) {
  const postId = req.body.postId
  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(401).send({message: '로그인이 필요한 기능입니다'})
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    const deletePost = await likeData.deleteLikePost(user.id, postId)
    if(user && deletePost) {
      return res.sendStatus(204)
    } else {
      return res.status(401).send({message: '로그인이 필요한 기능입니다'})
    }
  }
}