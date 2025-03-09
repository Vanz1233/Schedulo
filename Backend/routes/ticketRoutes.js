const express = require('express');
const Ticket = require('../models/Ticket'); // ✅ Import Ticket model

const router = express.Router();

// ✅ Create a Ticket
router.post('/', async (req, res) => {
    try {
        const { eventTitle, eventDateTime, tickets, promotionCode, discountPercentage, applicableTicketType } = req.body;

        if (!eventTitle || !eventDateTime || !tickets || tickets.length === 0) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newTicket = new Ticket({
            eventTitle,
            eventDateTime,
            tickets, // ✅ Now saving an array of ticket objects
            promotionCode,
            discountPercentage,
            applicableTicketType
        });

        await newTicket.save();
        res.status(201).json({ message: '✅ Ticket created successfully!', ticket: newTicket });
    } catch (error) {
        console.error('❌ Ticket Creation Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Fetch All Tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        console.error('❌ Error Fetching Tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

module.exports = router;

