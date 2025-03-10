const Event = require('../models/EventCreation'); // ✅ Correct import
const express = require('express');
const router = express.Router();

router.post('/create-event', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving event' });
    }
});

module.exports = router; // ✅ Export router
