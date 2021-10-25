import 'express-async-errors';
import jwt from 'jsonwebtoken';
import * as postData from '../data/post.js';
import * as userData from '../data/auth.js';
import * as imgData from '../data/img.js';
import * as likeData from '../data/like.js';
import * as entryData from '../data/entry.js';
import * as boardData from '../data/board.js';
import {config} from '../config.js';

export async function searchPost (req, res) {
  const {type, event, title, place, hostId, guestId} = req.query

  if(type && event && title) {
    const types = await postData.validType(type)
    const events = await postData.validEvent(event)
    if(types && events) {
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
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'})
    }
  } 
  else if(type && event && place) {
    const types = await postData.validType(type)
    const events = await postData.validEvent(event)
    if(types && events) {
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
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'})
    }
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
      return res.status(200).json({data: post});
    } else {
      return res.status(404).json({message: '해당 포스트가 없습니다'});
    }
  } else if (guestId) {
    const user = await postData.validUser(guestId);
    if (user) {
      const post = await postData.findByGuest(guestId);
      const like = await postData.countLike(post);
      const img = await postData.findByImg(post);

      for (let i = 0; i < post.length; i++) {
        post[i].like = like[i];
        post[i].img = img[i];
      }
      return res.status(200).json({data: post});
    } else {
      return res.status(404).json({message: '해당 포스트가 없습니다'});
    }
  }
  res.status(404).json({message: '해당 포스트가 없습니다'});
}

export async function getOne(req, res) {
  const authorization = req.headers.authorization;
  let userId;
  if (!authorization) {
    userId = 'guest';
  } else {
    const token = authorization.split(' ')[1];
    const user = await jwt.verify(token, String(config.jwt.secretKey));
    userId = user.id;
  }
  const postId = parseInt(req.params.postId);

  const post = await postData.findById(postId);
  if (!post) {
    return res.status(404).json({message: '해당 포스트가 없습니다'});
  } else {
    const hostUser = await userData.findById(post.userId);
    const userImgLink = await imgData.findById(hostUser.img);
    const postImgLink = await imgData.getPostImg(postId);
    // const postImgLink2 = await postData.findByImg([post]);

    console.log(hostUser, userImgLink.link, postImgLink);

    let like;
    if (userId === 'guest') {
      like = false;
    } else {
      const userList = await likeData.findByPostId(postId);
      userList.length === 0 ? (like = false) : (like = true);
    }

    console.log('like : ', like);

    const player = await entryData.findByPostId(postId);
    const board = await boardData.findByPostId(postId);

    console.log('player : ', player);
    console.log('board : ', board);

    if (post.type === 'trade') {
      return res.status(200).json({
        data: {
          userData: {
            userId: hostUser.id,
            nickname: hostUser.nickname,
            img: userImgLink,
          },
          title: post.title,
          place: post.place,
          text: post.text,
          img: postImgLink,
          like,
        },
      });
    } else {
      if (post.status === '대기') {
        return res.status(200).json({
          data: {
            userData: {
              userId: hostUser.id,
              nickname: hostUser.nickname,
              img: userImgLink,
            },
            title: post.title,
            place: post.place,
            text: post.text,
            img: postImgLink,
            like,
          },
        });
      } else if (post.status === '진행' || post.status === '완료') {
        return res.status(200).json({
          data: {
            userData: {
              userId: hostUser.id,
              nickname: hostUser.nickname,
              img: userImgLink,
            },
            title: post.title,
            place: post.place,
            text: post.text,
            img: postImgLink,
            like,
            player,
            board,
          },
        });
      }
    }
  }
}
