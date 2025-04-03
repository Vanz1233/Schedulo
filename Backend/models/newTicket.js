const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    tickets: [
        {
            section: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    promoCode: { type: String, default: '' }
});

module.exports = mongoose.model('Ticket', TicketSchema);


