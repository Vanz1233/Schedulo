const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  applicableTicketType: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
