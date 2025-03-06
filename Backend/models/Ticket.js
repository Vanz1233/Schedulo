const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true
  },
  eventDateTime: {
    type: Date,
    required: true
  },
  ticketTypes: [
    {
      type: String,
      required: true
    }
  ],
  prices: [
    {
      type: Number,
      required: true
    }
  ],
  promotionCode: {
    type: String,
    default: null
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  applicableTicketType: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

