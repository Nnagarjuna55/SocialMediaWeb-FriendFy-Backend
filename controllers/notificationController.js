// controllers/notificationController.js
const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { senderId, receiverId, type, postId, commentId } = req.body;
    const newNotification = new Notification({
      senderId,
      receiverId,
      type,
      postId,
      commentId,
      message: generateMessage(type),
    });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/notificationController.js
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiverId: req.user._id })
      .populate('senderId', 'username') // Populate sender details
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateMessage = (type) => {
  switch (type) {
    case 'like':
      return 'liked your post.';
    case 'comment':
      return 'commented on your post.';
    case 'follow':
      return 'started following you.';
    case 'unlike':
      return 'unliked your post.';
    case 'unfollow':
      return 'unfollowed you.';
    default:
      return '';
  }
};
