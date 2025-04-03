const express = require('express');
const router = express.Router();
const Ticket = require('../models/newTicket'); // Import the Ticket model

// 🎟️ Create a new ticket
router.post('/tickets', async (req, res) => {
    console.log('🔹 Received Data:', req.body); // Debugging log

    try {
        const { tickets, promoCode, discount } = req.body;  // Extract promoCode and discount from request body

        // 🔍 Validate incoming request
        if (!tickets || !Array.isArray(tickets)) {
            return res.status(400).json({ error: 'Tickets must be an array' });
        }

        // 🔍 Check if each ticket entry has required fields
        for (let ticket of tickets) {
            if (!ticket.section || !ticket.price) {
                return res.status(400).json({ error: 'Each ticket must have a section and a price' });
            }
        }

        // Create new Ticket object, now including promoCode and discount
        const newTicket = new Ticket({
            tickets,
            promoCode,  // Include promoCode
            discount    // Include discount
        });

        await newTicket.save();
        res.status(201).json({ message: '✅ Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error('❌ Ticket Creation Error:', error);
        res.status(500).json({ error: error.message });
    }
});


// 📌 Fetch all tickets
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        console.error('❌ Error fetching tickets:', error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Fetch a single ticket by ID
router.get('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error('❌ Error fetching ticket:', error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Delete a ticket by ID
router.delete('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json({ message: '✅ Ticket deleted successfully' });
    } catch (error) {
        console.error('❌ Error deleting ticket:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;









