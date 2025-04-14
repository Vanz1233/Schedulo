require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const Ticket = require('./models/newTicket');
const eventOrganizerRoutes = require('./routes/eventOrganiser');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentSuccessRoutes = require('./routes/paymentSuccess');
const dataChartsRoutes = require('./routes/dataCharts'); // ✅ Add analytics route

const app = express();

// ✅ Validate Environment Variables
const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI', 'EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ All required environment variables are loaded');
}

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// ✅ Load Routes
app.use('/api', eventOrganizerRoutes);
app.use('/api', ticketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentSuccessRoutes);

// ✅ Fix: Register analytics endpoint under `/api/analytics`
app.use('/api/analytics', dataChartsRoutes);

// ✅ Ticket Sections Endpoint
app.get('/api/ticket-sections', async (req, res) => {
  try {
    const sections = await Ticket.distinct('tickets.section');
    res.status(200).json({ sections });
  } catch (error) {
    console.error('❌ Error Fetching Ticket Sections:', error);
    res.status(500).json({ error: 'Failed to fetch ticket sections' });
  }
});

// ✅ Debug Registered Routes
if (process.env.NODE_ENV === 'development') {
  console.log('📌 Registered Routes:');
  app._router.stack
    .filter(r => r.route)
    .forEach(r => console.log(`➡️ ${r.route.path}`));
}

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email Service Error:', error);
  } else {
    console.log('✅ Email Service Ready to Send Emails');
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

















