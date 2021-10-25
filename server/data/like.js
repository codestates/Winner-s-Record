import Likes from './dummy/Users_Posts.js';

export async function findByPostId(postId) {
  const found = Likes.filter((el) => el.postId === postId);
  const userList = found.map((el) => {
    return el.userId;
  });
  return userList;
}
