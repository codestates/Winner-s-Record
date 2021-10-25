import Imgs from './dummy/Images.js';

export async function findById(id) {
  return Imgs.find((img) => img.id === id);
}

export async function createImg(link) {
  const newImg = {
    id: Imgs.length + 1,
    link,
  };
  Imgs.push(newImg);
  return newImg.id;
}
