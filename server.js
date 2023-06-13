const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// cors 설정을 하지 않으면 오류가 생김!!!!!!
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3500",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 1900;

io.on("connection", (socket) => {
  console.log("!!!!connection!!!!");
  socket.on("join_room", (roomName) => {
    console.log("join_room");
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    console.log("offer");
    socket.to(roomName).emit("offer", offer);
  });

  socket.on("answer", (answer, roomName) => {
    console.log("answer");
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    console.log("ice");
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

server.listen(PORT, handleListen);
