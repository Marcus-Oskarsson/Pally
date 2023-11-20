const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/profile/:id', async (req, res) => {
  try {
    const profile = await client.query(
      'SELECT * FROM userinfo WHERE userId = $1',
      [userId],
    );

    res.json(profile.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

router.delete('/profile/remove/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await client.query(
      `
      DELETE FROM user
      WHERE userId = $1
      `,
      [userId],
    );
    res.status(200).json({
      message: 'you have successfully deleted yourself from the system',
    });
  } catch (error) {
    console.error('nope, not removed yet', error);
    res.status(500).json({ error: 'failed to delete user' });
  }
});

module.exports = router;
