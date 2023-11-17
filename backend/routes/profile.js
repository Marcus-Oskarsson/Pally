const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/profile/:id', async (req, res) => {
  try {
    const profile = await client.query('SELECT * FROM userinfo');

    res.json(profile.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

module.exports = router;
