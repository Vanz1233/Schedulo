const express = require('express');
const Ticket = require('../models/Ticket'); // ✅ Import Ticket model

const router = express.Router();

// ✅ Helper function to assign seats based on maxTickets
function assignSeats(tickets, startingSeatIndex = 1) {
    let assignedSeats = [];
    let seatIndex = startingSeatIndex; // Start seat numbering from 1

    tickets.forEach(ticket => {
        let seatsForTicket = [];
        for (let i = 0; i < ticket.maxTickets; i++) {
            seatsForTicket.push(seatIndex++);
        }
        assignedSeats.push({ ...ticket, seats: seatsForTicket });
    });

    return assignedSeats;
}

// ✅ Create a Ticket
router.post('/', async (req, res) => {
    try {
        const { eventTitle, eventDateTime, tickets, promotionCode, discountPercentage, applicableTicketType } = req.body;

        // ✅ Ensure tickets array is valid
        if (!tickets || tickets.length === 0) {
            return res.status(400).json({ error: 'At least one ticket type is required' });
        }

        // ✅ Assign seats to tickets before saving
        const ticketsWithSeats = assignSeats(tickets);

        const newTicket = new Ticket({
            eventTitle: eventTitle || "Untitled Event",  // Set a default title if missing
            eventDateTime: eventDateTime || new Date(), // Default to current time if missing
            tickets: ticketsWithSeats, // ✅ Save assigned seats
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

// ✅ Route to Save Seating Assignments
router.post('/seating', async (req, res) => {
    try {
        const { eventTitle, seatingAssignments } = req.body;

        if (!eventTitle || !seatingAssignments || Object.keys(seatingAssignments).length === 0) {
            return res.status(400).json({ error: 'Event title and seating assignments are required' });
        }

        // ✅ Find event by title (modify this to use event ID if needed)
        const updatedTicket = await Ticket.findOneAndUpdate(
            { eventTitle },
            { $set: { seatingAssignments } },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: '✅ Seating assignments saved successfully!', updatedTicket });
    } catch (error) {
        console.error('❌ Error saving seating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Fetch All Tickets with Seating Assignments
router.get('/seating', async (req, res) => {
    try {
        const tickets = await Ticket.find({}, 'eventTitle seatingAssignments');
        res.status(200).json(tickets);
    } catch (error) {
        console.error('❌ Error Fetching Seating Assignments:', error);
        res.status(500).json({ error: 'Failed to fetch seating assignments' });
    }
});

module.exports = router;




