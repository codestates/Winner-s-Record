import Entries from './dummy/Entries.js';
import Users from './dummy/Users.js';

export async function findByPostId(postId) {
  const allEntries = Entries.filter((el) => el.postId === postId);
  return allEntries
    .filter((el) => el.status !== '대기')
    .map((el) => el.userId)
    .map((el) => {
      return Users.find((el2) => el2.id === el)?.nickname;
    });
}
