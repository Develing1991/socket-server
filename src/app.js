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
    console.log("front에서 요청: ", _data);
    const data = {
      aaa: "123",
    };
    setInterval(() => {
      socket.emit("send", data);
    }, 2000);
  });
});

httpServer.listen(port);
