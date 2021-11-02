const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
app.use(cors());
const db = require("./models/index.js")

const server = http.createServer(app);
console.log(db.Chattings)
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    const { roomId, nickname } = data
    socket.join(roomId);
    io.to(roomId).emit("onConnect", {
      content: `${nickname} 님이 입장했습니다.`,
    });
  });

  socket.on("sendMessage", async (data) => {
    const { message, userId, roomId, time } = data;
    io.to(roomId).emit("receiveMessage", {
      userId,
      message,
      roomId,
      time,
    });

    const chatting = await db.Chattings.create({
      userId: userId,
      roomId: roomId,
      content: message
    }).catch((err) => console.log(err))
  });

  socket.on("socketDisconnect", (data) => {
    const { roomId, nickname } = data;
    io.to(roomId).emit("onDisconnect", {
      content: `${nickname} 님이 퇴장하셨습니다.`,
    });
    socket.leave(roomId);
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`${process.env.SOCKET_PORT} 서버 실행`);
});
