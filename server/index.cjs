const express = require("express")
const app = express();
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
require('dotenv').config();
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

io.on("connection", (socket) => {
  console.log(socket)
  console.log('asdgdasggsdsdsssdasagddsga')
})

server.listen(process.env.HOST_PORT, () => {
  console.log(`${process.env.HOST_PORT} 서버 실행`)
})