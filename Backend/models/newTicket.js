const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    tickets: [
        {
            section: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Ticket', TicketSchema);


