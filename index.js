// //Express: A web framework for building server-side applications in Node.js.
// const express = require('express');
// //Mongoose: A MongoDB object modeling tool that provides a straightforward, schema-based solution to model your data.
// const mongoose = require('mongoose');
// //Cors: Middleware to allow cross-origin requests, essential for APIs that will be accessed from a different domain.
// const cors = require('cors');
// //Routers: These are imported from different route and controller files that manage authentication, user, post, comment, and upload routes.
// const authRouter = require('./routes/auth');
// const userRouter = require('./routes/user');
// const postRouter = require('./routes/post');
// const commentRouter = require('./routes/comment');
// // Import notification routes
// const notificationRoutes = require('./routes/notification');

// const uploadRouter = require('./controllers/uploadController');
// //Dotenv: Loads environment variables from a .env file into process.env.
// const dotenv = require('dotenv').config();
// //HTTP and Socket.io: http creates an HTTP server, and socket.io enables real-time, bidirectional communication between web clients and servers.
// const http = require('http');
// const { Server } = require('socket.io');

// // This line initializes an Express application, which will handle incoming HTTP requests.
// const app = express();

// const messageRouter = require('./routes/message');

// // 
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // WebSocket handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('offer', (offer) => {
//     socket.broadcast.emit('offer', offer);
//   });

//   socket.on('answer', (answer) => {
//     socket.broadcast.emit('answer', answer);
//   });

//   socket.on('ice-candidate', (candidate) => {
//     socket.broadcast.emit('ice-candidate', candidate);
//   });

//   socket.on('send_message', (data) => {
//     io.emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });

// });

// // Connect to MongoDB database
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('DB connection is a success'))
//   .catch(err => console.error('DB connection error:', err));

// // Serve static files (e.g., images) from the public/images directory
// app.use('/images', express.static('public/images'));
// app.use('/videos', express.static('public/videos'));

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/auth', authRouter);
// app.use('/user', userRouter);
// app.use('/post', postRouter);
// app.use('/comment', commentRouter);
// app.use('/upload', uploadRouter);
// app.use('/api/notifications', notificationRoutes);

// app.use('/api/messages', messageRouter);

// // Start the server with both REST API and WebSocket
// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const uploadRouter = require('./controllers/uploadController');
const notificationRoutes = require('./routes/notification'); // Correctly imported
const messageRouter = require('./routes/message');
const productRoutes = require('./routes/product'); 
const dotenv = require('dotenv').config();
const http = require('http');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// WebSocket handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connection is a success'))
  .catch(err => console.error('DB connection error:', err));

// Serve static files
app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/upload', uploadRouter);
app.use('/notifications', notificationRoutes); // Ensure this line is included
app.use('/messages', messageRouter);
app.use('/product', productRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
