import Imgs from './dummy/Images.js';
import PostImages from './dummy/Posts_Images.js';

export async function findById(id) {
  return Imgs.find((img) => img.id === id);
}

export async function getPostImg(postId) {
  const allImg = PostImages.filter((img) => img.postId === postId).map((el) => {
    return el.imgId;
  });
  return allImg.map((el) => {
    return Imgs.find((el2) => el2.id === el).link;
  });
}

export async function createImg(link) {
  const newImg = {
    id: Imgs.length + 1,
    link,
  };
  Imgs.push(newImg);
  return newImg.id;
}
