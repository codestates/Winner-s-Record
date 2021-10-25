import 'express-async-errors';
import * as likeData from '../data/like.js';

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
  res.status(201).send(2362)
}

export async function deleteLike (req, res) {
  res.status(201).send('anradfnafd')
}