const express = require('express');
const fs = require('file-system');
const multer = require('multer');
const router = express.Router();
const client = require('../connection');

const upload = multer({ dest: 'uploads/' });

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

router.put('/profile/:userId', upload.single('img'), async (req, res) => {
  const { userId } = req.params;

  try {
    // Save image
    const file = req.file;
    let destinationPath;
    if (file) {
      const img = fs.readFileSync(req.file.path);

      destinationPath = `uploads/${req.file.originalname}`;

      fs.writeFileSync(destinationPath, img);
      destinationPath = `/api/events/${destinationPath}`;

      fs.unlinkSync(req.file.path);
    }

    console.log('bild: ', req.file);

    // Create database entry
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
        destinationPath,
        req.body.password,
      ],
    );
    res.status(200).json({
      message: 'you have successfully updated your user settings',
      destinationPath,
    });
  } catch (error) {
    console.error('nope, not updated yet', error);
    res.status(500).json({ error: 'failed to uppdate user settings' });
  }
});

module.exports = router;
