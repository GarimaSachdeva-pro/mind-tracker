const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['happy','sad','angry','anxious','neutral','excited','tired'], required: true },
  note: { type: String, trim: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood', moodSchema);
