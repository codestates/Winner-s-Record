import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./router/auth.js";
import docRouter from "./router/doc.js";
import rankRouter from "./router/rank.js";
import likeRouter from "./router/like.js";
import matchRouter from "./router/match.js";
import entryRouter from "./router/entry.js";
import boardRouter from "./router/board.js";
import recordRouter from "./router/record.js";
import tournamentRouter from "./router/tournament.js";
import roomRouter from "./router/room.js";
import { config } from "./config.js";

const app = express();
const corsOptions = {
  origin: true,
  method: "*",
  allowedHeaders: ["Content-type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("tiny"));


app.get("/wr", (req, res, next) => {
  res.send(`Winner's Record-파이프라인 성공!`);

});

app.use("/auth", authRouter);
app.use("/doc", docRouter);
app.use("/match", matchRouter);
app.use("/tournament", tournamentRouter);
app.use("/entry", entryRouter);
app.use("/record", recordRouter);
app.use("/like", likeRouter);
app.use("/rank", rankRouter);
app.use("/board", boardRouter);
app.use("/room", roomRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.host.port);
