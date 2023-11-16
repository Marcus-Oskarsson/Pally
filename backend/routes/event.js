const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/events', async (req, res) => {
  try {
    const events = await client.query('SELECT * FROM eventinfo');

    res.json(events.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

router.post('/userevent', async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const result = await client.query(
      'INSERT INTO userEvent(userId, eventId) VALUES ($1, $2)',
      [userId, eventId]
    );

    res.status(201).json({ message: 'User event created successfully' });
  } catch (err) {
    console.error('Error creating user event:', err);
    res.status(500).json({ error: 'Failed to create user event' });
  }
});

module.exports = router;
