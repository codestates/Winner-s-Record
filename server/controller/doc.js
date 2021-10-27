import 'express-async-errors';
import jwt from 'jsonwebtoken';
import * as docData from '../data/doc.js';
import * as userData from '../data/auth.js';
import * as imgData from '../data/img.js';
import * as likeData from '../data/like.js';
import * as entryData from '../data/entry.js';
import * as boardData from '../data/board.js';
import {config} from '../config.js';

export async function searchDoc(req, res) {
  const {type, event, title, place, hostId, guestId} = req.query;

  if (type && event && title) {
    const types = await docData.validType(type);
    const events = await docData.validEvent(event);
    if (types && events) {
      const doc = await docData.findByType(type);
      const doc2 = await docData.findByEvent(doc, event);
      const doc3 = await docData.findByTitle(doc2, title);
      const like = await docData.countLike(doc3);
  //     const img = await docData.findByImg(doc3);

  //     for (let i = 0; i < doc3.length; i++) {
  //       doc3[i].like = like[i];
  //       doc3[i].img = img[i];
  //     }
  //     return res.status(200).send({data: doc3});
  //   } else {
  //     return res.status(404).send({message: '해당 포스트가 없습니다'});
  //   }
  // } else if (type && event && place) {
  //   const types = await docData.validType(type);
  //   const events = await docData.validEvent(event);
  //   if (types && events) {
  //     const doc = await docData.findByType(type);
  //     const doc2 = await docData.findByEvent(doc, event);
  //     const doc3 = await docData.findByPlace(doc2, place);
  //     const like = await docData.countLike(doc3);
  //     const img = await docData.findByImg(doc3);

  //     for (let i = 0; i < doc3.length; i++) {
  //       doc3[i].like = like[i];
  //       doc3[i].img = img[i];
  //     }
  //     return res.status(200).send({data: doc3});
  //   } else {
  //     return res.status(404).send({message: '해당 포스트가 없습니다'});
  //   }
  // } else if (hostId) {
  //   const user = await docData.validUser(hostId);
  //   if (user) {
  //     const doc = await docData.findByHost(hostId);
  //     const like = await docData.countLike(doc);
  //     const img = await docData.findByImg(doc);

  //     for (let i = 0; i < doc.length; i++) {
  //       doc[i].like = like[i];
  //       doc[i].img = img[i];
  //     }
  //     return res.status(200).json({data: doc});
  //   } else {
  //     return res.status(404).json({message: '해당 포스트가 없습니다'});
  //   }
  // } else if (guestId) {
  //   const user = await docData.validUser(guestId);
  //   if (user) {
  //     const doc = await docData.findByGuest(guestId);
  //     const like = await docData.countLike(doc);
  //     const img = await docData.findByImg(doc);

  //     for (let i = 0; i < doc.length; i++) {
  //       doc[i].like = like[i];
  //       doc[i].img = img[i];
  //     }
  //     return res.status(200).json({data: doc});
  //   } else {
  //     return res.status(404).json({message: '해당 포스트가 없습니다'});
    }
  res.status(200).send('adba')
  }
  res.status(404).json({message: '해당 포스트가 없습니다'});
}

export async function getOne(req, res) {
  const authorization = req.headers.Authorization;
  let userId;
  if (!authorization) {
    userId = 'guest';
  } else {
    const token = authorization.split(' ')[1];
    if (token === null) {
      userId = 'guest';
    } else {
      const user = await jwt.verify(token, String(config.jwt.secretKey));
      userId = user.id;
    }
  }
  const docId = parseInt(req.params.docId);

  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({message: '해당 포스트가 없습니다'});
  } else {
    const hostUser = await userData.findById(doc.userId);
    const userImgLink = await imgData.findById(hostUser.img);
    const docImgLink = await imgData.getDocImg(docId);
    // const docImgLink2 = await docData.findByImg([doc]);

    console.log(hostUser, userImgLink.link, docImgLink);

    let like;
    if (userId === 'guest') {
      like = false;
    } else {
      const userList = await likeData.findById(docId);
      userList.length === 0 ? (like = false) : (like = true);
    }

    console.log('like : ', like);

    const player = await entryData.findByDocId(docId);
    const board = await boardData.findByDocId(docId);

    console.log('player : ', player);
    console.log('board : ', board);

    if (doc.type === 'trade') {
      return res.status(200).json({
        data: {
          userData: {
            userId: hostUser.id,
            nickname: hostUser.nickname,
            img: userImgLink,
          },
          type: doc.type,
          status: doc.status,
          title: doc.title,
          price: doc.price,
          place: doc.place,
          text: doc.text,
          img: docImgLink,
          like,
        },
      });
    } else {
      if (doc.status === '대기') {
        return res.status(200).json({
          data: {
            userData: {
              userId: hostUser.id,
              nickname: hostUser.nickname,
              img: userImgLink,
            },
            type: doc.type,
            status: doc.status,
            title: doc.title,
            place: doc.place,
            text: doc.text,
            img: docImgLink,
            like,
          },
        });
      } else if (doc.status === '진행' || doc.status === '완료') {
        return res.status(200).json({
          data: {
            userData: {
              userId: hostUser.id,
              nickname: hostUser.nickname,
              img: userImgLink,
            },
            type: doc.type,
            status: doc.status,
            title: doc.title,
            place: doc.place,
            text: doc.text,
            img: docImgLink,
            like,
            player,
            board,
          },
        });
      }
    }
  }
}
