import Posts from './dummy/Posts.js';
import Users_Posts from './dummy/Users_Posts.js'
import Posts_Images from './dummy/Posts_Images.js'
import Images from './dummy/Images.js'
import Entries from './dummy/Entries.js'
import Users from './dummy/Users.js'

export async function findByType(type) {
  if(type === 'all') {
    return Posts
  }
  return Posts.filter((post) => post.type === type)
}

export async function findByEvent(data, event) {
  if(event === 'all') {
    return data
  }
  return data.filter((post) => post.event === event);
}

export async function findByTitle(data, title) {
  if(title === 'all') {
    return data
  }
  return data.filter((post) => (post.title).includes(title));
}

export async function findByPlace(data, place) {
  if(place === 'all') {
    return data
  }
  return data.filter((post) => (post.place).includes(place));
}

export async function countLike(data) {
  return data.map((post) => Users_Posts.filter((el) => el.postId === post.id).length)
}

export async function findByImg(data) {
  const id = data.map((post) => Posts_Images.filter((el) => el.postId === post.id))
  return id.map((post) => post.map((el) => Images.find((ele) => ele.id === el.imgId).link))
}

export async function findByHost(hostId) {
  return Posts.filter((post) => post.userId === parseInt(hostId));
}

export async function findByGuest(guestId) {
  const id = Entries.filter((entry) => (entry.userId === parseInt(guestId)) && (entry.status === '확정'))
  return id.map((el) => Posts.filter((post) => post.id === el.postId)[0])
}

export async function validUser(id) {
  return Users.find((el) => el.id === parseInt(id))
}