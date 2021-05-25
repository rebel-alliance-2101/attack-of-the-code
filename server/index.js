const PORT = process.env.PORT || 3000;
const app = require('./app');
const { Server } = require('socket.io');
let server;
const init = async () => {
  try {
    // start listening (and create a 'server' object representing our server)
    server = app.listen(PORT, () =>
      console.log(`Power! Unlimited power! (port ${PORT})`)
    );
  } catch (ex) {
    console.log(ex);
  }
};
init();
const io = new Server(server);

// socket.io logic
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('room', (room, user) => {
    console.log(`user: ${user}`, `joined room: ${room}`);
    socket.join(room);
    socket.to(room).emit('user-joined', { user, room });
  });
  socket.on('chat-message', (playerName, roomCode, message) => {
    console.log('chat message', roomCode, message);
    io.in(roomCode).emit('chat-message', { playerName, message });
  });
  socket.on('leave-room', (room, user) => {
    console.log(`user: ${user}`, `left room: ${room}`);
    io.in(room).emit('user-left', { user });
    socket.leave(room);
  });
});
