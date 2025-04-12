require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Send Email Route
router.post('/send-ticket-email', async (req, res) => {
  try {
    const { userEmail, ticketType, section, quantity, seats, totalPrice } = req.body;

    // For development, always send email to vancetindoc@gmail.com
    const recipientEmail = process.env.NODE_ENV === 'development'
      ? 'vancetindoc@gmail.com'
      : userEmail;

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: '🎟️ Your Ticket Receipt - Purchase Confirmation',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                padding: 30px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                color: #2c3e50;
              }
              .details {
                padding: 20px 0;
              }
              .details h3 {
                color: #444;
                margin-bottom: 10px;
                font-size: 18px;
              }
              .details p {
                margin: 5px 0;
                font-size: 16px;
              }
              .details span {
                font-weight: 600;
                color: #2c3e50;
              }
              .seats-box {
                background-color: #f0f0f0;
                padding: 10px;
                border-radius: 6px;
                margin-top: 10px;
                font-family: monospace;
                color: #444;
              }
              .price-box {
                background-color: #4caf50;
                color: white;
                text-align: center;
                padding: 15px;
                font-size: 20px;
                font-weight: bold;
                border-radius: 6px;
                margin: 25px 0 15px 0;
              }
              .footer {
                text-align: center;
                font-size: 14px;
                color: #888;
                padding-top: 15px;
                border-top: 1px solid #eee;
              }
              .footer p {
                margin: 4px 0;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>🎉 Ticket Purchase Confirmed!</h1>
              </div>
              <div class="details">
                <h3>Purchase Details:</h3>
                <p><span>Ticket Type:</span> ${ticketType}</p>
                <p><span>Section:</span> ${section}</p>
                <p><span>Quantity:</span> ${quantity}</p>
                <p><span>Seats:</span></p>
                <div class="seats-box">${seats.join(', ')}</div>
              </div>
              <div class="price-box">
                Total Paid: $${totalPrice}
              </div>
              <div class="footer">
                <p>Thank you for choosing us.</p>
                <p>We look forward to seeing you at the event!</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;










