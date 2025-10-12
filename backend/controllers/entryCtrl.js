const Entry = require('../models/Entry');

exports.createEntry = async (req, res) => {
  try {
    const media = (req.files || []).map(f => '/uploads/${f.filename}');
    const data = { ...req.body, user: req.user.id, media };
    // if activities/tags come as CSV strings, split:
    if (typeof data.activities === 'string') data.activities = data.activities.split(',').map(s => s.trim()).filter(Boolean);
    if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    const entry = new Entry(data);
    await entry.save();
    res.json(entry);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) { res.status(500).send('Server error'); }
};

exports.stats = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id });
    // simple stats: mood distribution, avg moodScore, entries by day
    const total = entries.length;
    const moodCount = {};
    let sumScore = 0;
    entries.forEach(e => {
      moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
      sumScore += (e.moodScore || 0);
    });
    const avg = total ? (sumScore / total) : 0;
    res.json({ total, moodCount, avg });
  } catch (err) { res.status(500).send('Server error'); }
};