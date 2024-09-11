const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController');  // Correct the import path
const verifyToken = require('../middlewares/auth'); // Correct import of verifyToken

const router = express.Router();

// Create a new notification
router.post('/', verifyToken, createNotification);

// Get notifications for the logged-in user
router.get('/', verifyToken, getNotifications);

module.exports = router;
