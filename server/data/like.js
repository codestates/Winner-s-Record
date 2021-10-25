import Users_Posts from './dummy/Users_Posts.js'
import Posts from './dummy/Posts.js'
import Posts_Images from './dummy/Posts_Images.js'
import Images from './dummy/Images.js'
import Users from './dummy/Users.js'

export async function findById(id) {
  const likePost = Users_Posts.filter((el) => el.userId === parseInt(id))
  const userPost = Posts.filter((post) => likePost.map((el) => el.postId).includes(post.id))
  const imgId = userPost.map((post) => Posts_Images.filter((el) => el.postId === post.id))
  const imges = imgId.map((post) => post.map((el) => Images.find((ele) => ele.id === el.imgId).link))
  const like = userPost.map((post) => Users_Posts.filter((el) => el.postId === post.id).length)
  for(let i = 0; i < userPost.length; i++) {
    userPost[i].like = like[i]
    userPost[i].img = imges[i]
  }
  return userPost
}

export async function validId(id) {
  return Users.find((el) => el.id === parseInt(id))
}
