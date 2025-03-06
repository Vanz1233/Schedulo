const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create Ticket
router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully!', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

module.exports = router;
