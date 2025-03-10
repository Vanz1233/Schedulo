require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // ✅ Nodemailer for emails
const eventOrganizerRoutes = require('./routes/eventOrganiser'); // Import event organizer routes
const eventCreationRoutes = require('./routes/eventCreation'); // Import event creation routes

const app = express();

// ✅ Debug: Ensure all necessary environment variables are loaded
const requiredEnvVars = ["JWT_SECRET", "MONGO_URI", "EMAIL_USER", "EMAIL_PASS"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing environment variable: ${envVar} in .env file`);
    process.exit(1);
  }
});
console.log("✅ All required environment variables loaded");

// ✅ Debug: Verify email credentials
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

// ✅ MongoDB Connection (Fixed TLS Issue)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //tls: true, // ✅ Fix SSL error by enabling TLS
  //tlsAllowInvalidCertificates: true // ✅ Allows self-signed certs (for local use)
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// ✅ Register Routes
app.use('/api', eventOrganizerRoutes);
app.use('/api', eventCreationRoutes);

// ✅ Debug: List all registered routes
app._router.stack
  .filter(r => r.route)
  .forEach(r => console.log(`📌 Route Registered: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`));

// ✅ Debug: Test Email Sending (Remove this in production)
const testEmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

testEmailTransporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer SMTP Error:", error);
  } else {
    console.log("✅ Nodemailer SMTP Connection Successful");
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));










