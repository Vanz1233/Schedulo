const mongoose = require('mongoose');

const EventOrganizerSchema = new mongoose.Schema({
  organizerName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const EventOrganizer = mongoose.model('EventOrganizer', EventOrganizerSchema);
module.exports = EventOrganizer;
