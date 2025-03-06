require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // ✅ Added nodemailer for debugging email issues

const eventOrganizerRoutes = require('./routes/eventOrganiser'); // Import event organizer routes

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
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS is missing in .env file");
  process.exit(1);
} else {
  console.log("✅ Email credentials loaded");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ✅ Updated Routes - Now works with "/api/register-organizer"
app.use('/api', eventOrganizerRoutes); 

// Debug: List Registered Routes
app._router.stack
  .filter(r => r.route)
  .forEach(r => console.log(`📌 Route Registered: ${r.route.path}`));



// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

console.log("EMAIL_USER:", process.env.EMAIL_USER);










