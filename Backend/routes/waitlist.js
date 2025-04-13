// routes/waitlist.js
const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

router.get('/waitlist', async (req, res) => {
  const list = await Waitlist.find();
  res.json(list);
});

router.post('/join', async (req, res) => {
  const { username, email, eventName } = req.body;
  const exists = await Waitlist.findOne({ username });

  if (!exists) {
    const newEntry = new Waitlist({
      username,
      email,
      eventName,
      joinDate: new Date()
    });
    await newEntry.save();
    return res.status(201).json(newEntry);
  }

  res.status(200).json({ message: 'Already in waitlist' });
});

router.delete('/cancel/:id', async (req, res) => {
  const { id } = req.params;
  await Waitlist.deleteOne({ _id: id });
  res.status(200).json({ message: 'Removed' });
});

module.exports = router;
