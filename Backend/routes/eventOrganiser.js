const express = require('express');
const bcrypt = require('bcrypt');
const EventOrganizer = require('../models/EventOrganizer');
const nodemailer = require('nodemailer');

const router = express.Router();

// ✅ Function to Generate a Random Password
const generateRandomPassword = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// ✅ Email Sending Function
const sendConfirmationEmail = async (email, fullName, plainPassword) => {
    const resetPasswordLink = `http://localhost:4200/password?email=${encodeURIComponent(email)}`;
    const loginLink = 'http://localhost:4200/login';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Schedulo - Your Event Organizer Account',
        html: `
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Welcome to <strong>Schedulo!</strong> We're excited to have you on board as an event organizer.</p>
            <p><strong>Below are your login details:</strong></p>
            <ul>
                <li>✉ <strong>Email:</strong> ${email}</li>
                <li>🔑 <strong>Password:</strong> ${plainPassword}</li>
            </ul>
            <p>Click the link below to log in to your account:</p>
            <p><a href="${loginLink}" target="_blank" 
                  style="background-color: #008CBA; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                  Login to Your Account
               </a>
            </p>
            <p><strong>Important:</strong></p>
            <p>For security reasons, please update your password upon your first login.</p>
            <p><a href="${resetPasswordLink}" target="_blank" 
                  style="background-color: #008CBA; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                  Reset Your Password
               </a>
            </p>
            <p>Looking forward to seeing your amazing events on Schedulo!</p>
            <p>Sincerely,<br/>Schedulo Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to:', email);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

// ✅ Register Event Organizer Route
router.post('/register-organizer', async (req, res) => {
    try {
        const { organizerName, fullName, email, phone, username } = req.body;
        const lowerEmail = email.toLowerCase().trim();

        const existingOrganizer = await EventOrganizer.findOne({ 
            $or: [{ email: lowerEmail }, { username }] 
        });

        if (existingOrganizer) {
            return res.status(400).json({ error: 'Organizer with this email or username already exists' });
        }

        // ✅ Generate Random Password
        const plainPassword = generateRandomPassword();

        // ✅ Hash Password Before Storing
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // ✅ Save New Event Organizer
        const newOrganizer = new EventOrganizer({
            organizerName,
            fullName,
            email: lowerEmail,
            phone,
            username,
            password: hashedPassword
        });

        await newOrganizer.save();

        // ✅ Send Confirmation Email with Plain Password
        await sendConfirmationEmail(lowerEmail, fullName, plainPassword);

        res.status(201).json({ message: 'Event Organizer registered successfully and confirmation email sent!' });
    } catch (error) {
        console.error('❌ Registration Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// ✅ Change Password Route
router.post('/change-password', async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const lowerEmail = email.toLowerCase().trim();
        const organizer = await EventOrganizer.findOne({ email: lowerEmail });

        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }

        // ✅ Verify current password (which was initially sent via email)
        const passwordMatch = await bcrypt.compare(currentPassword, organizer.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        // ✅ Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        organizer.password = hashedPassword;
        await organizer.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('❌ Error updating password:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/registered-organizers', async (req, res) => {
    try {
        const organizers = await EventOrganizer.find({}, '-password'); // Exclude passwords
        res.status(200).json(organizers);
    } catch (error) {
        console.error('❌ Error fetching organizers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;










