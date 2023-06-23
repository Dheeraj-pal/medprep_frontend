require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/start", (req, res) => {
  res.send("Welcome To WorkDesk Video Server");
});

const server = app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ RoomID, userID }) => {
    console.log(RoomID, userID);
    socket.join(RoomID);
    socket.to(RoomID).emit("user-join", userID);

    socket.on("disconnect", () => {
      socket.to(RoomID).emit("user-disconnected", userID);
    });
  });
});
