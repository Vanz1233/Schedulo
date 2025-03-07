require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const eventOrganizerRoutes = require('./routes/eventOrganiser'); 
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// ✅ Validate Environment Variables
const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI', 'EMAIL_USER', 'EMAIL_PASS'];
let missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

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
app.use('/api/tickets', ticketRoutes);

// ✅ Debug Registered Routes (Only in Development)
if (process.env.NODE_ENV === 'development') {
  console.log('📌 Registered Routes:');
  app._router.stack
    .filter(r => r.route)
    .forEach(r => console.log(`➡️ ${r.route.path}`));
}

// ✅ Nodemailer Debugging
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or use another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Test Email Configuration
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











