const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, nickname }) => {
    socket.join(roomId);
    io.to(roomId).emit("onConnect", {
      content: `${nickname} 님이 입장했습니다.`,
    });
  });

  socket.on("sendMessage", (data) => {
    const { message, userId, roomId, time } = data;
    console.log(data);
    io.to(roomId).emit("receiveMessage", {
      userId,
      message,
      roomId,
      time,
    });
  });

  socket.on("socketDisconnect", (data) => {
    const { roomId, nickname } = data;
    socket.leave(roomId);

    io.to(roomId).emit("onDisconnect", {
      content: `${nickname} 님이 퇴장하셨습니다.`,
    });
  });
});

server.listen(8081, () => {
  console.log(`8081 서버 실행`);
});
