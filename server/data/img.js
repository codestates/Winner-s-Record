import db from '../models/index.js';

export async function findById(id) {
  return Images.find((img) => img.id === id);
}

export async function getDocImg(postId) {
  const allImg = Docs_images.filter((img) => img.postId === postId).map(
    (el) => {
      return el.imgId;
    }
  );
  return allImg.map((el) => {
    return Images.find((el2) => el2.id === el).link;
  });
}

export async function createImg(link) {
  const newImg = await db.Images.create({
    link,
  }).then((data) => data.dataValues);
  return newImg.link;
}
