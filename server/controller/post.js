import 'express-async-errors';
import * as postData from '../data/post.js';

export async function searchPost(req, res) {
  const {type, event, title, place, hostId, guestId} = req.query
  if(type && event && title) {
    const post = await postData.findByType(type)
    const post2 = await postData.findByEvent(post, event)
    const post3 = await postData.findByTitle(post2, title)
    const like = await postData.countLike(post3)
    const img = await postData.findByImg(post3)

    for(let i = 0; i < post3.length; i++) {
      post3[i].like = like[i]
      post3[i].img = img[i]
    }
    return res.status(200).send({data: post3})
  } 
  else if(type && event && place) {
    const post = await postData.findByType(type)
    const post2 = await postData.findByEvent(post, event)
    const post3 = await postData.findByPlace(post2, place)
    const like = await postData.countLike(post3)
    const img = await postData.findByImg(post3)

    for(let i = 0; i < post3.length; i++) {
      post3[i].like = like[i]
      post3[i].img = img[i]
    }
    return res.status(200).send({data: post3})
  } 
  else if (hostId) {
    const user = await postData.validUser(hostId)
    if(user) {
      const post = await postData.findByHost(hostId)
      const like = await postData.countLike(post)
      const img = await postData.findByImg(post)
  
      for(let i = 0; i < post.length; i++) {
        post[i].like = like[i]
        post[i].img = img[i]
      }
      return res.status(200).send({data: post})
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'})
    }
  } 
  else if (guestId) {
    const user = await postData.validUser(guestId)
    if(user) {
      const post = await postData.findByGuest(guestId)
      const like = await postData.countLike(post)
      const img = await postData.findByImg(post)
  
      for(let i = 0; i < post.length; i++) {
        post[i].like = like[i]
        post[i].img = img[i]
      }
      return res.status(200).send({data: post})
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'})
    }
  }
  res.status(404).send({message: '해당 포스트가 없습니다'})
}
