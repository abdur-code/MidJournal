const Entry = require('../models/Entry');

const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user._id })
      .sort({ date: -1, createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEntry = async (req, res) => {
  try {
    const { date, content } = req.body;
    
    const entry = await Entry.create({
      userId: req.user._id,
      date: new Date(date),
      content
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, content } = req.body;

    const entry = await Entry.findOne({ _id: id, userId: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    entry.date = new Date(date);
    entry.content = content;
    await entry.save();

    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Entry.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };