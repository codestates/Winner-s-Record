import db from '../models/index.js';

export async function findById(id) {
  return Images.find((img) => img.id === id);
}

export async function getDocImg(docId) {
  const allImgId = await db.Docs_Images.findAll({
    attributes: ['imgId'],
    where: {docId: 3},
  });
  console.log(allImgId);
  const linkList = await allImgId.map(async (el) => {
    return await db.Images.findAll({
      attributes: ['link'],
      where: {id: el.dataValues.imgId},
    });
  });
  console.log(linkList);
  return linkList;
}

export async function createImg(link) {
  const newImg = await db.Images.create({
    link,
  }).then((data) => data.dataValues);
  return newImg.link;
}
