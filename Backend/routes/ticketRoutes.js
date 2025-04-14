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
            if (!ticket.section || !ticket.price || !ticket.type) {
                return res.status(400).json({ error: 'Each ticket must have a section, type, and price' });
            }
        }

        // Create new Ticket object, now including promoCode and discount
        const newTicket = new Ticket({
            tickets,
            promoCode: promoCode || null,  // Default to null if not provided
            discount: discount || 0       // Default to 0 if no discount provided
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

// 📌 Fetch ticket details based on section
router.get('/tickets/section/:section', async (req, res) => { // Fixed route definition
    try {
        const section = req.params.section.toUpperCase(); // Ensure case sensitivity

        console.log(`Requested Section: ${section}`); // Debugging log

        const ticketData = await Ticket.findOne({ 'tickets.section': section });

        console.log(`Database Query Result:`, ticketData); // Debugging log

        if (!ticketData) {
            return res.status(404).json({ message: 'No ticket found for this section' });
        }

        // Extract the correct ticket from the array
        const selectedTicket = ticketData.tickets.find(ticket => ticket.section === section);

        console.log(`Selected Ticket:`, selectedTicket); // Debugging log

        if (!selectedTicket) {
            return res.status(404).json({ message: 'Ticket details not found for this section' });
        }

        res.status(200).json({
            type: selectedTicket.type,
            price: selectedTicket.price,
            promoCode: ticketData.promoCode || null, // Assuming promoCode applies to all tickets
            discount: ticketData.discount || 0      // Including discount in response
        });

    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;











