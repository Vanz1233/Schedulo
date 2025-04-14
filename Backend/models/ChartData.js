
const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  ticketType: String,
  section: String,
  quantity: Number,
  seats: [String],
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChartData', chartDataSchema);
