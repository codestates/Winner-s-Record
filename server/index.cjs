const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
app.use(cors());
const roomData = require("./data/room.js");
const db = require('./models/index.js');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", async (data) => {
    const { roomId } = data;
    socket.join(roomId);
  });

  socket.on("sendDocData", async (data) => {
    const { roomId, id, img, title, updatedAt, place } = data;
    const payload = {
      docId: id,
      img,
      title,
      updatedAt,
      place,
    };
    io.to(roomId).emit("receiveDocData", payload);
    const docStringfy = JSON.stringify(payload);
    const datas = {roomId, content: `tlstjdgnsdbeoguddlwjdgnsdjagPwls|${docStringfy}`}
    const result = await roomData.createChattingDoc(datas)
  });

  socket.on("sendMessage", async (data) => {
    const { content, userId, roomId, updatedAt } = data;
    io.to(roomId).emit("receiveMessage", {
      userId,
      content,
      roomId,
      updatedAt,
    });
    const datas = {userId, roomId, content}
    const result = await roomData.createChatting(datas)
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`${process.env.SOCKET_PORT} 서버 실행`);
});
