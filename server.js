const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

app.use(express.static(__dirname + "/public"));

io.sockets.on("connection", function (socket) {
  //creating connection
  console.log("Connected to: " + socket.id);

  //error
  socket.on("error", function (err) {
    console.log("Error!", err);
  });

  //room created
  socket.on("room", function (room) {
    socket.join(room);
    console.log("room joined: " + room);
  });

  //when disconnected
  socket.on("disconnect", function () {
    console.log(socket.id + " Disconnected");
  });

  var room = "room1";
  //Data exchange between client and server
  //Server recieves new data from a client and broadcast it to others
  socket.on("client_character", function (msg) {
    console.log("Data from client: " + msg.buffer);

    socket.in(room).broadcast.emit("server_character", msg.buffer);
  });
});

const port = process.env.PORT || 4444;
http.listen(port, () => {
  console.log("Server running on: http://localhost:4444");
});
