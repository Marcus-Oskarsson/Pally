const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/friends', async (req, res) => {
  try {
    const friends = await client.query(`
    SELECT f.friendId, u2.userFirstName AS firstName, u2.userLastName AS lastName
    FROM friend f
    INNER JOIN userInfo u2 ON f.user2Id = u2.userId`);
    res.json(friends.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: 'failed' });
  }
});

router.get('/friends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const friends = await client.query(
      `
      SELECT f.friendId,
             CASE WHEN f.user1Id = $1 THEN u2.userFirstName ELSE u1.userFirstName END AS firstName,
             CASE WHEN f.user1Id = $1 THEN u2.userLastName ELSE u1.userLastName END AS lastName
      FROM friend f
      INNER JOIN userInfo u1 ON f.user1Id = u1.userId
      INNER JOIN userInfo u2 ON f.user2Id = u2.userId
      WHERE f.user1Id = $1 OR f.user2Id = $1
      `,
      [userId]
    );
    res.json(friends.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: `Failed with id ${userId}` });
  }
});

module.exports = router;
