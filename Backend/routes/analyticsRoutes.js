const express = require('express');
const router = express.Router();
const Ticket = require('../models/newTicket'); // Adjust based on your schema

// Helper function to group data by date
function groupByDate(data, period) {
  const moment = require('moment');
  const grouped = {};

  data.forEach((ticket) => {
    const date = moment(ticket.createdAt);
    let key;

    if (period === 'daily') key = date.format('YYYY-MM-DD');
    else if (period === 'weekly') key = date.startOf('isoWeek').format('YYYY-[W]WW');
    else if (period === 'monthly') key = date.format('YYYY-MM');

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ticket);
  });

  return grouped;
}

// Analytics endpoint
router.post('/analytics/report', async (req, res) => {
  const { type, period } = req.body;

  try {
    const tickets = await Ticket.find({}); // You can filter by event or date if needed

    const grouped = groupByDate(tickets, period);

    const report = Object.entries(grouped).map(([label, items]) => {
      let value = 0;

      if (type === 'ticketSales') {
        value = items.reduce((sum, t) => sum + t.tickets.length, 0);
      } else if (type === 'revenue') {
        value = items.reduce((sum, t) => sum + t.totalPrice, 0);
      } else if (type === 'seatOccupancy') {
        value = items.length; // Could also use `t.tickets.length` depending on seat logic
      }

      return { label, value };
    });

    res.status(200).json({ report });
  } catch (err) {
    console.error('Error generating analytics report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;
