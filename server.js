const log = console.log;
// initialize http server, socket.io and port number
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.use(express.static(__dirname + "/public"));

// const express = require("express");
// const app = express();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  log("connected");
  socket.on("message", (evt) => {
    log(evt);
    socket.broadcast.emit("message", evt);
  });
});
io.on("disconnect", (evt) => {
  log("some people left");
});

// const port = 3000;
http.listen(port, () => log(`server started on: http://localhost:${port}`));
