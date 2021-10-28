import pkg from 'sequelize';
import db from '../models/index.js';
const { Op } = pkg;

export async function findById(id) {
  const likes = await db.Users_Docs.findAll({
    where: {
      userId: id
    }
  }).catch((err) => console.log(err));
  
  const likePost = likes.map((el) => el.dataValues)
  const docId = likePost.map((el) => el.docId)

  const userDocs = await db.Docs.findAll({
    where: {
      id: {
        [Op.in]: docId
      }
    }
  }).catch((err) => console.log(err));

  const docs = userDocs.map((el) => el.dataValues)

  const likeList = await db.Users_Docs.findAll({
    where: {
      docId: {
        [Op.in]: docId
      }
    }
  }).catch(err => console.log(err))

  const likeMatch = {}
  for(let i = 0; i < likeList.length; i++) {
    if(likeMatch[likeList[i].docId] === undefined) {
      likeMatch[likeList[i].docId] = 1
    } else {
      likeMatch[likeList[i].docId]++
    }
  }

  const docList = await db.Docs_Images.findAll({
    where: {
      docId: {
        [Op.in]: docId
      }
    }
  }).catch((err) => console.log(err));

  const imgId = docList.map((el) => el.imgId)
  const imgList = await db.Images.findAll({
    where: {
      id: {
        [Op.in]: imgId
      }
    }
  }).catch(err => console.log(err))

  const imgMatch = {}
  for(let i = 0; i < docList.length; i++) {
    for(let j = 0; j < imgList.length; j++) {
      if(imgMatch[docList[i].docId] === undefined && docList[i].imgId === imgList[j].id) {
        imgMatch[docList[i].docId] = [imgList[j].link]
      } else if (docList[i].imgId === imgList[j].id){
          imgMatch[docList[i].docId].push(imgList[j].link)
      }
    }
  }
  const key = Object.keys(imgMatch);
  for (let i = 0; i < docs.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (docs[i].id === parseInt(key[j])) {
        docs[i].like = likeMatch[docs[j].id] || 0;
        docs[i].img = imgMatch[docs[j].id];
      }
    }
  }
  return docs
}

export async function addLikeDoc(userId, docId) {
  const checkDocId = await db.Docs.findOne({
    where: {
      id: docId
    }
  }).catch(err => console.log(err))

  if (checkDocId) {
    const addLike = await db.Users_Docs.create({
      userId: userId,
      docId: docId
    }).catch(err => console.log(err))

    const result = await db.Users_Docs.findOne({
      where: {
        userId: userId,
        docId, docId
      }
    }).catch(err => console.log(err))
    return result.dataValues
  }
}

export async function deleteLikeDoc(userId, docId) {
  const checkDocId = await db.Docs.findOne({
    where: {
      id: docId
    }
  }).catch(err => console.log(err))

  if (checkDocId) {
    const deleteLike = await db.Users_Docs.destroy({
      where: {
        userId: userId,
        docId: docId
      }
    }).catch(err => console.log(err))
    return 'ok'
  } else {
    return 'cannot delete'
  }
}

export async function validId(id) {
  const result = await db.Users.findOne({
    where: {
      id: id
    }
  }).catch((err) => console.log(err));
  return result
}

export async function findByUserId(userId) {
  const likeDoc = await db.Users_Docs.findAll({
    attributes: ['docId'],
    where: {userId},
  });
  return likeDoc.map((el) => {
    return el.dataValues.docId;
  });
}
