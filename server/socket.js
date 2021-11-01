// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

import http from "http";
import express from "express"
import {io} from "socket.io-client"

const app = express()

const httpServer = http.createServer(app).listen(8080, () => {
  console.log('asgdasdgasdg')
})

const socketServer = io("httpServer")
socketServer.on("connection", (socket) => {
  socket.on("join", ({ roomName: room, userName: user }) => {
    socket.join(room);
    socketServer.to(room).emit("onConnect", `${user} 님이 입장했습니다.`);
    
    socket.on("onSend", (messageItem) => {
      socketServer.to(room).emit("onReceive", messageItem);
    });
    
    socket.on("disconnect", () => {
      socket.leave(room);
      socketServer.to(room).emit("onDisconnect", `${user} 님이 퇴장하셨습니다.`);
    });
  })
})