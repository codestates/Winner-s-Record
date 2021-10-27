import db from '../models/index.js';

export async function findById(id) {
  const likePost = Users_docs.filter((el) => el.userId === parseInt(id));
  const userPost = Docs.filter((post) =>
    likePost.map((el) => el.postId).includes(post.id)
  );
  const imgId = userPost.map((post) =>
    Docs_images.filter((el) => el.postId === post.id)
  );
  const imges = imgId.map((post) =>
    post.map((el) => Images.find((ele) => ele.id === el.imgId).link)
  );
  const like = userPost.map(
    (post) => Users_docs.filter((el) => el.postId === post.id).length
  );
  for (let i = 0; i < userPost.length; i++) {
    userPost[i].like = like[i];
    userPost[i].img = imges[i];
  }
  return userPost;
}

export async function addLikePost(userId, postId) {
  const checkPostId = Docs.find((el) => el.id === postId);
  if (checkPostId) {
    const post = {id: Users_docs.length + 1, userId: userId, postId: postId};
    Users_docs.push(post);
    return post;
  }
}

export async function deleteLikePost(userId, postId) {
  const checkPostId = Docs.find((el) => el.id === postId);
  if (checkPostId) {
    Users_docs.filter((el) => el.userId === userId && el.postId === postId);
    return 'ok';
  } else {
    Docs_images;
  }
}

export async function validId(id) {
  return Users.find((el) => el.id === parseInt(id));
}
