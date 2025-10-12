const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createEntry, getEntries, stats } = require('../controllers/entryCtrl');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.array('media', 5), createEntry);
router.get('/', auth, getEntries);
router.get('/stats', auth, stats);

module.exports = router;