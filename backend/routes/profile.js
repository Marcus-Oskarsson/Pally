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
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

router.delete('/profile/remove/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await client.query(
      `
      DELETE FROM userEvent
      WHERE userId = $1
      `,
      [userId],
    );
    await client.query(
      `
      DELETE FROM friend
      WHERE user1Id = $1 OR user2Id = $1
      `,
      [userId],
    );
    await client.query(
      `
      DELETE FROM userinfo
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

router.put('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(req.body);
  try {
    // await client.query(
    //   `
    //   UPDATE FROM userEvent
    //   WHERE userId = $1
    //   `,
    //   [userId],
    // );
    // await client.query(
    //   `
    //   UPDATE FROM friend
    //   WHERE user1Id = $1 OR user2Id = $1
    //   `,
    //   [userId],
    // );
    await client.query(
      `
      UPDATE userinfo
      SET
      userFirstName=$2, userLastName=$3, userEmail=$4, userPersonalNumber=$5, userPhoneNumber=$6, userStreet=$7, userZipCode=$8, userCity=$9, userImgUrl=$10, userPassword=$11
      WHERE userId = $1
      `,
      [
        userId,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.personalNumber,
        req.body.phone,
        req.body.street,
        req.body.zipCode,
        req.body.city,
        req.body.img,
        req.body.password,
      ],
    );
    res.status(200).json({
      message: 'you have successfully updated your user settings',
    });
  } catch (error) {
    console.error('nope, not updated yet', error);
    res.status(500).json({ error: 'failed to uppdate user settings' });
  }
});

module.exports = router;
