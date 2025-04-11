const express = require('express');
const router = express.Router();
const TicketData = require('../models/ChartData');

// Save ticket data
router.post('/save', async (req, res) => {
  try {
    const ticket = new TicketData(req.body);
    await ticket.save();
    res.status(201).json({ message: 'Ticket data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save ticket data' });
  }
});

// Get reports (updated to support seat occupancy)
router.post('/report', async (req, res) => {
  const { reportType, period } = req.body;

  let startDate;
  const now = new Date();

  if (period === 'daily') {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'weekly') {
    startDate = new Date();
    startDate.setDate(now.getDate() - 7);
  } else if (period === 'monthly') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    return res.status(400).json({ error: 'Invalid period' });
  }

  try {
    const data = await TicketData.find({ createdAt: { $gte: startDate } });

    if (reportType === 'seatOccupancy') {
      // Total seats available (as per your setup)
      const TOTAL_SEATS = 742;

      // Group and calculate occupancy per period
      const occupancyMap = {};

      data.forEach((entry) => {
        const date = new Date(entry.createdAt);
        let label;

        if (period === 'daily') {
          label = date.toISOString().split('T')[0];
        } else if (period === 'weekly') {
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay());
          label = startOfWeek.toISOString().split('T')[0];
        } else if (period === 'monthly') {
          label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        occupancyMap[label] = (occupancyMap[label] || 0) + entry.quantity;
      });

      // Build the report array with occupancy %
      const report = Object.entries(occupancyMap).map(([label, quantity]) => ({
        label,
        occupancyRate: ((quantity / TOTAL_SEATS) * 100).toFixed(2)
      }));

      return res.json({ report });
    }

    // Default return for ticketSales or revenue
    return res.json({ report: data });
  } catch (err) {
    console.error('❌ Error generating report:', err);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

module.exports = router;


