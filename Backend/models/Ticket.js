const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventDateTime: { type: Date, required: true },
  tickets: [
    {
      type: { type: String, required: true },
      price: { type: Number, required: true },
      maxTickets: { type: Number, required: true, min: 1 }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);



