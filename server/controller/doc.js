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
      const docList = doc3.map((el) => el.dataValues);
      if (docList.length !== 0) {
        const like = await docData.countLike(docList);
        const img = await docData.findByImg(docList);
        const key = Object.keys(img);

        for (let i = 0; i < docList.length; i++) {
          for (let j = 0; j < key.length; j++) {
            if (docList[i].id === parseInt(key[j])) {
              docList[i].like = like[docList[j].id] || 0;
              docList[i].img = img[docList[j].id];
            }
          }
        }
        return res.status(200).send({data: docList});
      }
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'});
    }
  } else if (type && event && place) {
    const types = await docData.validType(type);
    const events = await docData.validEvent(event);
    if (types && events) {
      const doc = await docData.findByType(type);
      const doc2 = await docData.findByEvent(doc, event);
      const doc3 = await docData.findByPlace(doc2, place);
      const docList = doc3.map((el) => el.dataValues);
      if (docList.length !== 0) {
        const like = await docData.countLike(docList);
        const img = await docData.findByImg(docList);
        const key = Object.keys(img);

        for (let i = 0; i < docList.length; i++) {
          for (let j = 0; j < key.length; j++) {
            if (docList[i].id === parseInt(key[j])) {
              docList[i].like = like[docList[j].id] || 0;
              docList[i].img = img[docList[j].id];
            }
          }
        }
        return res.status(200).send({data: docList});
      }
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'});
    }
  } else if (hostId) {
    const user = await docData.validUser(hostId);
    const doc = await docData.findByHost(hostId);
    const docList = doc.map((el) => el.dataValues);
    if (user && docList.length !== 0) {
      const like = await docData.countLike(docList);
      const img = await docData.findByImg(docList);
      const key = Object.keys(img);

      for (let i = 0; i < docList.length; i++) {
        for (let j = 0; j < key.length; j++) {
          if (docList[i].id === parseInt(key[j])) {
            docList[i].like = like[docList[j].id] || 0;
            docList[i].img = img[docList[j].id];
          }
        }
      }
      return res.status(200).send({data: docList});
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'});
    }
  } else if (guestId) {
    const user = await docData.validUser(guestId);
    const doc = await docData.findByGuest(guestId);
    const docList = doc.map((el) => el.dataValues);
    if (user && docList.length !== 0) {
      const like = await docData.countLike(docList);
      const img = await docData.findByImg(docList);
      const key = Object.keys(img);

      for (let i = 0; i < docList.length; i++) {
        for (let j = 0; j < key.length; j++) {
          if (docList[i].id === parseInt(key[j])) {
            docList[i].like = like[docList[j].id] || 0;
            docList[i].img = img[docList[j].id];
          }
        }
      }
      return res.status(200).send({data: docList});
    } else {
      return res.status(404).send({message: '해당 포스트가 없습니다'});
    }
  }
  return res.status(404).json({message: '해당 포스트가 없습니다'});
}

export async function getOne(req, res) {
  const authorization = req.headers.authorization;
  console.log(authorization);
  let userId;
  if (!authorization) {
    userId = 'guest';
  } else {
    const token = authorization.split(' ')[1];
    if (token === 'null') {
      //null? or "null?"
      userId = 'guest';
    } else {
      const user = await jwt.verify(token, String(config.jwt.secretKey));
      userId = user.id;
    }
  }
  console.log('나 토큰줬는데 : ', userId);
  const docId = parseInt(req.params.docId);

  const doc = await docData.findById(docId);
  if (!doc) {
    return res.status(404).json({message: '해당 포스트가 없습니다'});
  } else {
    const hostUser = await userData.findById(doc.userId);
    const docImgLink = await docData.findByImg([doc]);

    console.log(hostUser.nickname, hostUser.img, docImgLink[docId.toString()]);

    let like;
    if (userId === 'guest') {
      like = false;
    } else {
      const likeList = await likeData.findByUserId(userId);
      likeList.length === 0 ? (like = false) : (like = true);
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
            img: hostUser.img,
          },
          type: doc.type,
          status: doc.status,
          title: doc.title,
          price: doc.price,
          place: doc.place,
          text: doc.text,
          img: docImgLink[docId.toString()],
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
              img: hostUser.img,
            },
            type: doc.type,
            status: doc.status,
            title: doc.title,
            place: doc.place,
            text: doc.text,
            img: docImgLink[docId.toString()],
            like,
          },
        });
      } else if (doc.status === '진행' || doc.status === '완료') {
        return res.status(200).json({
          data: {
            userData: {
              userId: hostUser.id,
              nickname: hostUser.nickname,
              img: hostUser.img,
            },
            type: doc.type,
            status: doc.status,
            title: doc.title,
            place: doc.place,
            text: doc.text,
            img: docImgLink[docId.toString()],
            like,
            player,
            board,
          },
        });
      }
    }
  }
}
