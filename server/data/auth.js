import Users from './dummy/Users.js';

export async function createUser(user) {
  const newUser = {
    id: Users.length + 1,
    ...user,
  };
  Users.push(newUser);
  console.log(Users);
  return newUser.id;
}

export async function findByEmail(email) {
  return Users.find((user) => user.email === email);
}

export async function findByNickname(nickname) {
  return Users.find((user) => user.nickname === nickname);
}

export async function findById(id) {
  return Users.find((user) => user.id === id);
}
