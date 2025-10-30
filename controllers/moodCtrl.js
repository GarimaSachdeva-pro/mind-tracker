const Mood = require('../models/Mood');

exports.addMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const newMood = new Mood({ user: req.user.id, mood, note });
    await newMood.save();
    res.status(201).json({ message: 'Mood logged successfully', newMood });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getMoodTrends = async (req, res) => {
  try {
    const trends = await Mood.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.status(200).json(trends);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
