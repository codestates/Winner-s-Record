import entries from './dummy/Entries.js';

export async function findByPostId(postId) {
  const allEntries = entries.filter((el) => el.postId === postId);
  return allEntries.filter((el) => el.status !== '대기');
}
