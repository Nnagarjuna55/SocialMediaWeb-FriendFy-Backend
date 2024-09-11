// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('offer', (offer) => {
//     socket.broadcast.emit('offer', offer);
//   });

//   socket.on('answer', (answer) => {
//     socket.broadcast.emit('answer', answer);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(5001, () => {
//   console.log('Server is running on port 5001');
// });
