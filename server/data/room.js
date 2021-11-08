import pkg from "sequelize";
import db from "../models/index.js";
const { Op } = pkg;

export async function chatList(userId) {
  const list = await db.Users_Rooms.findAll({
    where: {
      userId: userId,
    },
  }).catch((err) => console.log(err));
  const chatList = list.map((el) => el.dataValues);
  const roomsId = chatList.map((el) => el.roomId);
  const roomList = await db.Rooms.findAll({
    where: {
      id: {
        [Op.in]: roomsId,
      },
    },
  }).catch((err) => console.log(err));
  const roomsList = roomList.map((el) => el.dataValues);
  const hostId = roomsList
    .map((el) => el.hostId)
    .filter((ele) => ele !== userId);
  const guestId = roomsList
    .map((el) => el.guestId)
    .filter((ele) => ele !== userId);
  const hostUser = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: hostId,
      },
    },
  }).catch((err) => console.log(err));

  const guestUser = await db.Users.findAll({
    where: {
      id: {
        [Op.in]: guestId,
      },
    },
  }).catch((err) => console.log(err));

  const hostUserList = hostUser.map((el) => el.dataValues);
  const guestUserList = guestUser.map((el) => el.dataValues);

  for (let i = 0; i < roomsList.length; i++) {
    for (let j = 0; j < hostUserList.length; j++) {
      if (roomsList[i].hostId === hostUserList[j].id) {
        roomsList[i].nickname = hostUserList[j].nickname;
        roomsList[i].img = hostUserList[j].img;
      }
    }
  }
  for (let i = 0; i < roomsList.length; i++) {
    for (let j = 0; j < guestUserList.length; j++) {
      if (roomsList[i].guestId === guestUserList[j].id) {
        roomsList[i].nickname = guestUserList[j].nickname;
        roomsList[i].img = guestUserList[j].img;
      }
    }
  }
  const roomId = roomsList.map((el) => el.id);

  const chatting = await db.Chattings.findAll({
    where: {
      roomId: {
        [Op.in]: roomId,
      },
    },
  }).catch((err) => console.log(err));
  const chattings = chatting.map((el) => el.dataValues);
  const chattingsMatch = {};
  for (let i = 0; i < roomsList.length; i++) {
    for (let j = 0; j < chattings.length; j++) {
      if (
        chattingsMatch[roomsList[i].id] === undefined &&
        roomsList[i].id === chattings[j].roomId
      ) {
        chattingsMatch[roomsList[i].id] = [chattings[j].id];
      } else if (roomsList[i].id === chattings[j].roomId) {
        chattingsMatch[roomsList[i].id].push(chattings[j].id);
      }
    }
  }
  for (let i = 0; i < roomsList.length; i++) {
    for (let j = 0; j < chattings.length; j++) {
      for (let key in chattingsMatch) {
        if (
          roomsList[i].id === chattings[j].roomId &&
          chattings[j].id === Math.max(...chattingsMatch[key])
        ) {
          roomsList[i].content = chattings[j].content;
          roomsList[i].date = chattings[j].updatedAt;
        }
      }
    }
  }
  return roomsList;
}

export async function validUser(roomId, userId) {
  const validRoom = await db.Rooms.findOne({
    where: {
      id: roomId,
    },
  }).catch((err) => console.log(err));
  if (validRoom === null) {
    return;
  } else if (
    validRoom.dataValues.hostId === userId ||
    validRoom.dataValues.guestId === userId
  ) {
    return validRoom.dataValues;
  }
}

export async function deleteRoom(roomId, userId) {
  const deleteRoom = await db.Users_Rooms.destroy({
    where: {
      roomId: roomId,
      userId: userId,
    },
  }).catch((err) => console.log(err));
  return "ok";
}

export async function validRoom(docId, userId) {
  const checkDoc = await db.Docs.findOne({
    where: {
      id: docId,
    },
  }).catch((err) => console.log(err));

  if (checkDoc === null) {
    return "cannot find doc";
  } else {
    const hostId = checkDoc.dataValues.userId;
    const checkRoom = await db.Rooms.findOne({
      where: {
        hostId: hostId,
        guestId: userId,
      },
    }).catch((err) => console.log(err));
    return checkRoom;
  }
}

export async function createRoom(docId, userId) {
  const hostId = await db.Docs.findOne({
    where: {
      id: docId,
    },
  })
    .then((res) => res.dataValues.userId)
    .catch((err) => console.log(err));

  const room = await db.Rooms.create({
    hostId: hostId,
    guestId: userId,
  })
    .then((res) => res.dataValues.id)
    .catch((err) => console.log(err));

  const guestRoom = await db.Users_Rooms.create({
    roomId: room,
    userId: userId,
  }).catch((err) => console.log(err));

  const hostRoom = await db.Users_Rooms.create({
    roomId: room,
    userId: hostId,
  }).catch((err) => console.log(err));

  return room;
}

export async function checkRoom(docId, userId) {
  const hostId = await db.Docs.findOne({
    where: {
      id: docId,
    },
  })
    .then((res) => res.dataValues.userId)
    .catch((err) => console.log(err));

  const findRoomId = await db.Rooms.findOne({
    where: {
      hostId: hostId,
      guestId: userId,
    },
  })
    .then((res) => res.dataValues.id)
    .catch((err) => console.log(err));

  const checkGuestRoom = await db.Users_Rooms.findOne({
    where: {
      roomId: findRoomId,
      userId: userId,
    },
  }).catch((err) => console.log(err));

  const checkHostRoom = await db.Users_Rooms.findOne({
    where: {
      roomId: findRoomId,
      userId: hostId,
    },
  });

  if (checkGuestRoom === null && checkHostRoom === null) {
    const room = await db.Rooms.create({
      hostId: hostId,
      guestId: userId,
    })
      .then((res) => res.dataValues.id)
      .catch((err) => console.log(err));

    const guestRoom = await db.Users_Rooms.create({
      roomId: room,
      userId: userId,
    }).catch((err) => console.log(err));

    const hostRoom = await db.Users_Rooms.create({
      roomId: room,
      userId: hostId,
    }).catch((err) => console.log(err));
    return room;
  } else if (checkGuestRoom === null) {
    const guestRoom = await db.Users_Rooms.create({
      roomId: findRoomId,
      userId: userId,
    }).catch((err) => console.log(err));
    return findRoomId;
  } else if (checkHostRoom === null) {
    const hostRoom = await db.Users_Rooms.create({
      roomId: findRoomId,
      userId: hostId,
    }).catch((err) => console.log(err));
    return findRoomId;
  } else {
    return findRoomId;
  }
}

export async function chatUser(userId, roomId, docId) {
  const validDoc = await db.Docs.findOne({
    where: {
      id: docId,
    },
  })
    .then((res) => res.dataValues)
    .catch((err) => console.log(err));

  if (validDoc) {
    const validRoom = await db.Rooms.findOne({
      where: {
        id: roomId,
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));
    if (
      validRoom !== undefined &&
      validDoc.userId === validRoom.hostId &&
      (validRoom.hostId === userId || validRoom.guestId === userId)
    ) {
      const imgs = await db.Docs_Images.findOne({
        where: {
          docId: docId,
        },
      })
        .then((res) => res.dataValues.imgId)
        .catch((err) => console.log(err));
      const img = await db.Images.findOne({
        where: {
          id: imgs,
        },
      })
        .then((res) => res.dataValues.link)
        .catch((err) => console.log(err));
      validDoc.img = img;
      return validDoc;
    } else {
      return;
    }
  }
}

export async function chattings(roomId, userId) {
  const chat = await db.Chattings.findAll({
    where: {
      roomId: roomId,
    },
  }).catch((err) => console.log(err));
  const chatList = chat.map((el) => el.dataValues);
  if (chatList.length === 0) {
    const userData = await db.Rooms.findOne({
      where: {
        id: roomId,
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));
    const id = userData.hostId === userId ? userData.guestId : userData.hostId;
    const users1 = await db.Users.findOne({
      where: {
        id: id,
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));
    const result = {};
    result.id = users1.id;
    result.nickname = users1.nickname;
    result.img = users1.img;
    return { data: [], userData: result };
  } else {
    const chattingUserId = chatList
      .map((el) => el.userId)
      .filter((ele) => ele !== userId);
    const users2 = await db.Users.findOne({
      where: {
        id: chattingUserId[0],
      },
    })
      .then((res) => res.dataValues)
      .catch((err) => console.log(err));
    if (users2 === undefined) {
      const userData = await db.Rooms.findOne({
        where: {
          id: roomId,
        },
      })
        .then((res) => res.dataValues)
        .catch((err) => console.log(err));
      const id =
        userData.hostId === userId ? userData.guestId : userData.hostId;
      const users3 = await db.Users.findOne({
        where: {
          id: id,
        },
      })
        .then((res) => res.dataValues)
        .catch((err) => console.log(err));
      const result = {};
      result.id = users3.id;
      result.nickname = users3.nickname;
      result.img = users3.img;
      return { data: chatList, userData: result };
    } else {
      const result = {};
      result.id = users2.id;
      result.nickname = users2.nickname;
      result.img = users2.img;
      return { data: chatList, userData: result };
    }
  }
}
