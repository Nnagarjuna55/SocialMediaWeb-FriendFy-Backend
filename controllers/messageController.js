const Message = require('../models/Message'); // Import your Message model
const Notification = require('../models/Notification'); // Import your Notification model

// Handle sending a message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, recipientId, text } = req.body;
    const newMessage = new Message({ senderId, recipientId, text });
    const savedMessage = await newMessage.save();

    // Create a notification for the recipient
    const newNotification = new Notification({
      senderId,
      receiverId: recipientId,
      type: 'message',
      message: 'sent you a message.'
    });
    await newNotification.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle fetching messages
exports.getMessages = async (req, res) => {
  console.log('Fetching messages for:', req.params.recipientId); // Add this line
  try {
    const { recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, recipientId },
        { senderId: recipientId, recipientId: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
