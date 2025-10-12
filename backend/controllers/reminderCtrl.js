const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  try {
    const r = new Reminder({ ...req.body, user: req.user.id });
    await r.save();
    res.json(r);
  } catch (err) { res.status(500).send('Server error'); }
};

exports.getReminders = async (req, res) => {
  try {
    const rs = await Reminder.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(rs);
  } catch (err) { res.status(500).send('Server error'); }
};

exports.toggleReminder = async (req, res) => {
  try {
    const rem = await Reminder.findById(req.params.id);
    if (!rem) return res.status(404).send('Not found');
    rem.active = !rem.active;
    await rem.save();
    res.json(rem);
  } catch (err) { res.status(500).send('Server error'); }
};
