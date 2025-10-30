const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  mood: { type: String },
  moodScore: { type: Number, min: 0, max: 10 },
  activities: [String],
  thoughts: String,
  tags: [String],
  media: [String]
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
