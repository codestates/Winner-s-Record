import db from '../models/index.js';

export async function findByType(type) {
  if (type === 'all') {
    return Docs;
  }
  return Docs.filter((post) => post.type === type);
}

export async function findByEvent(data, event) {
  if (event === 'all') {
    return data;
  }
  return data.filter((post) => post.event === event);
}

export async function findByTitle(data, title) {
  if (title === 'all') {
    return data;
  }
  return data.filter((post) => post.title.includes(title));
}

export async function findByPlace(data, place) {
  if (place === 'all') {
    return data;
  }
  return data.filter((post) => post.place.includes(place));
}

export async function countLike(data) {
  return data.map(
    (post) => Users_docs.filter((el) => el.postId === post.id).length
  );
}

export async function findByImg(data) {
  const id = data.map((post) =>
    Docs_images.filter((el) => el.postId === post.id)
  );
  return id.map((post) =>
    post.map((el) => Images.find((ele) => ele.id === el.imgId).link)
  );
}

export async function findByHost(hostId) {
  return Docs.filter((post) => post.userId === parseInt(hostId));
}

export async function findByGuest(guestId) {
  const id = Entries.filter(
    (entry) => entry.userId === parseInt(guestId) && entry.status === '확정'
  );
  return id.map((el) => Docs.filter((post) => post.id === el.postId)[0]);
}

export async function validUser(id) {
  return Users.find((el) => el.id === parseInt(id));
}

export async function findById(id) {
  return Docs.find((post) => post.id === id);
}

export async function validEvent(event) {
  return (
    event === 'all' ||
    event === 'tennis' ||
    event === 'pingpong' ||
    event === 'squash' ||
    event === 'badminton'
  );
}

export async function validType(type) {
  return (
    type === 'all' ||
    type === 'trade' ||
    type === 'match' ||
    type === 'tounarment'
  );
}
