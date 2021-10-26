import Entries from './dummy/Entries.js';
import Users from './dummy/Users.js';
import Posts from './dummy/Posts.js'
import Images from './dummy/Images.js'
import Records from './dummy/Records.js'

export async function findByPostId (postId) {
  const allEntries = Entries.filter((el) => el.postId === postId);
  return allEntries
    .filter((el) => el.status !== '대기')
    .map((el) => el.userId)
    .map((el) => {
      return Users.find((el2) => el2.id === el)?.nickname;
    });
}

export async function addPostEntry (userId, postId) {
  const post = Posts.find((el) => el.id === parseInt(postId))
  if(post.type === 'tounarment' && post.status === '대기') {
    const entry = {id: Entries.length + 1, status: '대기', postId: parseInt(postId), userId: userId}
    Entries.push(entry)
    const entries = Entries.filter((el) => el.postId === parseInt(postId) && el.status !== '호스트')
    return entries
  } else {
    return
  }
}

export async function entryList (postId, entries) {
  const event = Posts.find((el) => el.id === parseInt(postId)).event
  const userId = entries.map((el) => el.userId)
  const users = Users.filter((el) => userId.includes(el.id))
  let rank = Records.filter((el) => el.event === event).sort((a, b) => a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0)
  .sort((a, b) => b.point - a.point)
  for(let i = 0; i < entries.length; i++) {
    entries[i].nickname = users[i].nickname
    entries[i].img = Images.find((el) => el.id === users[i].img).link
    entries[i].win = rank.find((el) => el.userId === users[i].id).win
    entries[i].lose = rank.find((el) => el.userId === users[i].id).lose
    entries[i].point = rank.find((el) => el.userId === users[i].id).point
    entries[i].rank = rank.findIndex((el) => el.userId === users[i].id) + 1
  }
  return entries
}

export async function deleteEntryPost (hostId, postId, userId) {
  const entries = Entries.filter((el) => el.postId === parseInt(postId) && el.status !== '호스트')
  const entryUser = entries.filter((el) => el.status === '대기').map((el) => el.userId)
  const entryPost = Posts.find((el) => el.id === parseInt(postId))
  if(entryPost.userId === hostId && entryUser.includes(userId)) {
    return entries.filter((el) => el.userId !== userId)
  } else {
    return
  }
}

export async function changeEntryStatus (hostId, postId, userId) {
  const entries = Entries.filter((el) => el.postId === parseInt(postId) && el.status !== '호스트')
  const entryUser = entries.map((el) => el.userId)
  const entryPost = Posts.find((el) => el.id === parseInt(postId))
  if(entryPost.userId === hostId && entryUser.includes(userId)) {
    for(let i = 0; i < entries.length; i++) {
      if(entries[i].userId === userId && entries[i].status === '확정') {
        entries[i].status = '대기'
      } else if (entries[i].userId === userId && entries[i].status === '대기') {
        entries[i].status = '확정'
      }
    }
    return entries
  } else {
    return
  }
}