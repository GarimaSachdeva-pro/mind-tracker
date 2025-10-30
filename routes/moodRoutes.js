const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addMood, getMoods, getMoodTrends } = require('../controllers/moodCtrl');

router.post('/', auth, addMood);
router.get('/', auth, getMoods);
router.get('/trends', auth, getMoodTrends);

module.exports = router;
