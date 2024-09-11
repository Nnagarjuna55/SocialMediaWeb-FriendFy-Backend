// // models/Notification.js
// const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   type: { type: String, enum: ['like', 'comment', 'follow', 'unlike', 'unfollow'], required: true },
//   postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//   commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Notification', NotificationSchema);


const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'comment', 'follow', 'unlike', 'unfollow', 'message'], required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', NotificationSchema);
