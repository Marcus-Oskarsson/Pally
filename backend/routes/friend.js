const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/friends', async (req, res) => {
  try {
    const friends = await client.query(`
    SELECT f.friendId, u2.userFirstName AS firstName, u2.userLastName AS lastName
    FROM friend f
    INNER JOIN userInfo u2 ON f.user2Id = u2.userId

  `);
    res.json(friends.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: 'failed' });
  }
});

module.exports = router;
