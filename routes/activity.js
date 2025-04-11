const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');

// Removed protect middleware temporarily
router.get('/', async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort('-createdAt');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;