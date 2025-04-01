const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Admin model
const EventOrganiser = require('../models/EventOrganizer'); // Event Organiser model

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // ✅ Use email, not username!

    try {
        // 🔍 Check if user is an Admin
        const admin = await Admin.findOne({ email });
        if (admin) {
            if (password === admin.password) { // ✅ Admin password is NOT hashed
                const token = jwt.sign(
                    { role: 'admin', email: admin.email }, 
                    'secretKey', 
                    { expiresIn: '1h' }
                );
                return res.json({ message: 'Admin login successful', role: 'admin', token });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        }

        // 🔍 Check if user is an Event Organiser
        const organiser = await EventOrganiser.findOne({ email });
        if (organiser) {
            const isMatch = await bcrypt.compare(password, organiser.password); // ✅ Compare hashed password
            if (isMatch) {
                const token = jwt.sign(
                    { role: 'event-organiser', email: organiser.email }, 
                    'secretKey', 
                    { expiresIn: '1h' }
                );
                return res.json({ message: 'Event organiser login successful', role: 'event-organiser', token });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        }

        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

