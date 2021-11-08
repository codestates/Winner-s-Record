const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
app.use(cors());
const db = require("./models/index.js");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
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
    const chatting = await db.Chattings.create({
      roomId,
      content: `tlstjdgnsdbeoguddlwjdgnsdjagPwls|${docStringfy}`,
    }).catch((err) => console.log(err));
  });

  socket.on("sendMessage", async (data) => {
    const { content, userId, roomId, updatedAt } = data;
    io.to(roomId).emit("receiveMessage", {
      userId,
      content,
      roomId,
      updatedAt,
    });

    const chatting = await db.Chattings.create({
      userId: userId,
      roomId: roomId,
      content: content,
    }).catch((err) => console.log(err));
  });
});

const hostname = "http://3.36.30.63";
server.listen(process.env.SOCKET_PORT, hostname, () => {
  console.log(`${process.env.SOCKET_PORT} 서버 실행`);
});
