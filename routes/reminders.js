const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createReminder, getReminders, toggleReminder } = require('../controllers/reminderCtrl');

router.post('/', auth, createReminder);
router.get('/', auth, getReminders);
router.patch('/:id/toggle', auth, toggleReminder);

module.exports = router;
