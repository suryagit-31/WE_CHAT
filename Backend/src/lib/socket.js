import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export function get_reciver_socketId(userId) {
  return usersocket_map[userId];
}
//keeps track of online users and their sockets
const usersocket_map = {}; //socketId:userId

io.on("connection", (socket) => {
  console.log("user connected with the socket id", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    usersocket_map[userId] = socket.id;

    io.emit("getonlineUsers", Object.keys(usersocket_map));
  }
  socket.on("disconnect", () => {
    console.log("user disconnected with socket id ", socket.id);
    delete usersocket_map[userId];
    io.emit("getonlineUsers", Object.keys(usersocket_map));
  });
});

export { io, server, app };
