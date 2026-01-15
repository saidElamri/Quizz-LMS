const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');

// Fetch notifications for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { recipient: req.user.id },
        { recipient: null } // Broadcasts
      ]
    }).sort({ createdAt: -1 }).limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'ALERT_FETCH_FAILURE' });
  }
});

// Mark a notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'PROTOCOL_ACKNOWLEDGED' });
  } catch (error) {
    res.status(500).json({ error: 'ACK_FAILURE' });
  }
});

// Broadcast a system update (Admin tool - mock for now)
router.post('/broadcast', authenticate, async (req, res) => {
    const { title, message, type } = req.body;
    try {
        const notif = new Notification({
            title,
            message,
            type: type || 'SYSTEM_UPDATE',
            recipient: null
        });
        await notif.save();
        res.status(201).json(notif);
    } catch (error) {
        res.status(500).json({ error: 'BROADCAST_FAILURE' });
    }
});

module.exports = router;
