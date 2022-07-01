const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("What about socket.io");
  console.log("Socket.io is connected.");

  // Getting data from frontend....
  socket.on("chat", (payload) => {
    console.log("In payload : ", payload);

    //sending data to frontend..
    io.emit("chat", payload);
  });
});

server.listen(4000, () => {
  console.log("Server is listening at port 400");
});
