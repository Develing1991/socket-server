import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

const httpServer = createServer(app);
const port = 4000;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  // ...
  console.log("socket connect", socket.handshake.headers.origin);
  socket.on("listenData", (_data) => {
    console.log("front에서 연결 요청: ", _data);
    setInterval(() => {
      socket.emit("send", [
        randomize(),
        randomize(),
        randomize(70, 80),
        randomize(30, 40),
        randomize(20, 30),
        randomize(),
        randomize(),
      ]);
    }, 5000);
  });
});

function randomize(min = 1, max = 80) {
  return Math.floor(Math.random() * (max - min) + min);
}

httpServer.listen(port);
