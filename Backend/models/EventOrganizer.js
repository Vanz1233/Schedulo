const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const EventOrganizerSchema = new mongoose.Schema({
  organizerName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
EventOrganizerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const EventOrganizer = mongoose.model('EventOrganizer', EventOrganizerSchema);
module.exports = EventOrganizer;

