require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import Models
const User = require('./models/User');
const EventOrganizer = require('./models/EventOrganizer');

const app = express();

// Debug: Ensure .env variables are loaded
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env file");
  process.exit(1);
}
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Handles form data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// ✅ User Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, phone, username, password } = req.body;
    const lowerEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email: lowerEmail }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save New User
    const newUser = new User({ fullName, email: lowerEmail, phone, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// ✅ User Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    // Find user
    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Login successful!', 
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        username: user.username
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ✅ Event Organizer Registration Route (Uses Correct Model)
app.post('/api/register-organizer', async (req, res) => {
  try {
    const { organizerName, fullName, email, phone, username, password } = req.body;
    const lowerEmail = email.toLowerCase();

    // Check if organizer already exists
    const existingOrganizer = await EventOrganizer.findOne({ email: lowerEmail });
    if (existingOrganizer) {
      return res.status(400).json({ error: 'Organizer with this email already exists' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save New Event Organizer
    const newOrganizer = new EventOrganizer({
      organizerName,
      fullName,
      email: lowerEmail,
      phone,
      username,
      password: hashedPassword
    });

    await newOrganizer.save();
    res.status(201).json({ message: 'Event Organizer registered successfully!' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Debug: List Registered Routes
console.log('Registered Routes:', app._router.stack
  .filter(r => r.route)
  .map(r => r.route.path)
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







