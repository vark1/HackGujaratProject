$(function () {
  var socket = io.connect("http://localhost:4444", {
    "sync disconnect on unload": false,
  });

  var room = "room1";
  socket.on("connect", function () {
    socket.emit("room", room);
  });

  //recieve character from server
  socket.on("server_character", function (content) {
    console.log("From server: " + content);
    document.getElementById("notepad").innerHTML = content;
  });

  //For each typed character
  $("#notepad").on("keyup", function () {
    var character = $("#notepad").val();

    //send characters to server
    socket.emit("client_character", { buffer: character });
    console.log("To server: ", { buffer: character });
  });
});
