// models/Waitlist.js
const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  username: String,
  email: String,
  eventName: String,
  joinDate: Date
});

module.exports = mongoose.model('Waitlist', waitlistSchema);