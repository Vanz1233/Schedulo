const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Match MongoDB ObjectId format
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    ID: { type: String, required: true }, // Matches "ID" exactly as in DB
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
}, { collection: 'Admin' }); // Explicitly set the collection name

module.exports = mongoose.model('Admin', adminSchema);

