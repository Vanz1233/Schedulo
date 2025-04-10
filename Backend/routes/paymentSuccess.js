require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or use another email service
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
        subject: 'Ticket Purchase Confirmation',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  width: 600px;
                  margin: 0 auto;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  font-size: 24px;
                  text-align: center;
                  margin-bottom: 20px;
                }
                .section {
                  margin-bottom: 15px;
                }
                .section p {
                  font-size: 16px;
                  margin: 5px 0;
                }
                .section p strong {
                  color: #2c3e50;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 14px;
                  color: #777;
                }
                .footer p {
                  margin: 5px 0;
                }
                .total-price {
                  background-color: #2ecc71;
                  color: #fff;
                  padding: 10px;
                  font-size: 18px;
                  font-weight: bold;
                  text-align: center;
                  border-radius: 5px;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Ticket Purchase Confirmed</h1>
                <div class="section">
                  <p><strong>Ticket Type:</strong> ${ticketType}</p>
                  <p><strong>Section:</strong> ${section}</p>
                  <p><strong>Quantity:</strong> ${quantity}</p>
                  <p><strong>Seats:</strong> ${seats.join(', ')}</p>
                </div>
                <div class="total-price">
                  <p><strong>Total Price: $${totalPrice}</strong></p>
                </div>
                <div class="footer">
                  <p>Thank you for your purchase!</p>
                  <p>If you have any questions, feel free to reach out to us.</p>
                </div>
              </div>
            </body>
          </html>
        `
      };
      

    // Send Email
    await transporter.sendMail(mailOptions);

    // Respond with success message in JSON format
    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    // Send error message in JSON format
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;









