const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const verifyToken = require('../middlewares/auth');
// Route to handle sending a message
// Backend route definition in routes/message.js
router.post('/', messageController.sendMessage);
router.get('/:recipientId', verifyToken, messageController.getMessages);

module.exports = router;
