import db from '../models/index.js';

export async function findById(id) {
  return Images.find((img) => img.id === id);
}

export async function getPostImg(postId) {
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
  const newImg = {
    id: Images.length + 1,
    link,
  };
  Images.push(newImg);
  return newImg.id;
}
