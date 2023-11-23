const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/friends', async (req, res) => {
  try {
    const friends = await client.query(`
    SELECT f.friendId, u2.userFirstName AS firstName, u2.userLastName AS lastName
    FROM friend f
    INNER JOIN userInfo u2 ON f.user2Id = u2.userId`);
    console.log(friends.rows);
    res.json(friends.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: 'failed' });
  }
});

router.get('/friends/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const friends = await client.query(
      `
      SELECT u.userId, f.friendId, u.userFirstName AS firstName, u.userLastName AS lastName, u.userimgurl AS userimgUrl
      FROM userInfo u
      INNER JOIN friend f ON (u.userId = f.user1Id OR u.userId = f.user2Id)
      WHERE (f.user1Id = $1 OR f.user2Id = $1) AND u.userId != $1;
      `,
      [userId],
    );
    res.json(friends.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: `Failed with id ${userId}` });
  }
});

router.get('/friends/search/:userId', async (req, res) => {
  const { userId } = req.params;
  const { search } = req.query;
  try {
    const query = `
    SELECT u.userId, u.userFirstName AS firstName, u.userLastName AS lastName, u.userimgurl AS userimgUrl
    FROM userInfo u
    WHERE u.userId NOT IN (
      SELECT f.user2Id FROM friend f WHERE f.user1Id = $1
      UNION
      SELECT f.user1Id FROM friend f WHERE f.user2Id = $1
    ) AND u.userId != $1
    ${search ? 'AND (u.userFirstName ILIKE $2 OR u.userLastName ILIKE $2)' : ''}
    `;
    const values = search ? [userId, `%${search}%`] : [userId];
    const users = await client.query(query, values);

    res.json(users.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: `Failed with id ${userId}` });
  }
});

// Kopierade ovan, men vände på det så man bara söker bland sina vänner
router.get('/friends/myfriends/search/:userId', async (req, res) => {
  const { userId } = req.params;
  const { search } = req.query;
  try {
    const query = `
    SELECT u.userId, CONCAT(u.userFirstName, ' ', u.userLastName) AS fullName, u.userimgurl AS userimgUrl
    FROM userInfo u
    INNER JOIN friend f ON (u.userId = f.user1Id OR u.userId = f.user2Id)
    WHERE (f.user1Id = $1 OR f.user2Id = $1) AND u.userId != $1
    ${search ? 'AND (u.userFirstName ILIKE $2 OR u.userLastName ILIKE $2)' : ''}
    `;
    const values = search ? [userId, `%${search}%`] : [userId];
    const users = await client.query(query, values);

    res.json(users.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: `Failed with id ${userId}` });
  }
});

// Kopierade ovan, men vände på det så man bara söker bland sina vänner
router.get('/friends/myfriends/search/:userId', async (req, res) => {
  const { userId } = req.params;
  const { search } = req.query;
  try {
    const query = `
    SELECT u.userId, CONCAT(u.userFirstName, ' ', u.userLastName) AS fullName, u.userimgurl AS userimgUrl
    FROM userInfo u
    INNER JOIN friend f ON (u.userId = f.user1Id OR u.userId = f.user2Id)
    WHERE (f.user1Id = $1 OR f.user2Id = $1) AND u.userId != $1
    ${search ? 'AND (u.userFirstName ILIKE $2 OR u.userLastName ILIKE $2)' : ''}
    `;
    const values = search ? [userId, `%${search}%`] : [userId];
    const users = await client.query(query, values);

    res.json(users.rows);
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: `Failed with id ${userId}` });
  }
});

router.post('/friends', async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    await client.query(
      `
    INSERT INTO friend (user1Id, user2Id)
    VALUES ($1, $2)
    `,
      [userId, friendId],
    );
    res.status(200).json({ message: 'yay you made a new friend' });
  } catch (error) {
    console.error('failed', error);
    res.status(500).json({ error: 'oh no, it failed' });
  }
});

router.delete('/friends/:friendId', async (req, res) => {
  const { friendId } = req.params;

  try {
    await client.query(
      `
      DELETE FROM friend
      WHERE friendId = $1
      `,
      [friendId],
    );
    res.status(200).json({ message: 'yay you lost a friend' });
  } catch (error) {
    console.error('oh no you`re still friends', error);
    res.status(500).json({ error: 'failed to delete friendship' });
  }
});

module.exports = router;
