const express = require('express');
const fs = require('file-system');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const client = require('../connection');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

//Renderar alla upcoming-events
router.get('/events', async (req, res) => {
  try {
    const events = await client.query('SELECT * FROM eventinfo');

    res.json(events.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

//Skapa ett nytt event
router.post('/events', upload.single('eventImage'), async (req, res) => {
  console.log('req.file', req.file);
  try {
    // Save image
    const file = req.file;
    let destinationPath;
    if (file) {
      const img = fs.readFileSync(req.file.path);

      // Define the destination path
      destinationPath = `uploads/${req.file.originalname}`;
      const image = await Jimp.read(destinationPath);
      await image.resize(300, 300).write(destinationPath);

      console.log('bild2: ', image);

      // Move the file to the destination folder
      fs.writeFileSync(destinationPath, img);
      destinationPath = `/api/events/${destinationPath}`;

      // Remove the file from the temporary location
      fs.unlinkSync(req.file.path);
    }

    // Create database entry
    const { eventName, eventStreet, eventEmail, eventDate, eventCreator } =
      req.body;

    const query = `
      INSERT INTO eventInfo(eventName, eventImage, eventStreet, eventEmail, eventDate, eventCreator)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING * `;
    const values = [
      eventName,
      destinationPath,
      eventStreet,
      eventEmail,
      eventDate,
      eventCreator,
    ];

    const newEvent = await client.query(query, values);
    res.status(201).json({ success: true, event: newEvent.rows[0] });
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

//Hämtar alla signups till alla event
router.get('/eventsignup', async (req, res) => {
  try {
    const events = await client.query('SELECT * FROM userevent');

    res.json(events.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

//Här hämtar den alla events baserat på användare med index
router.get('/events/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const events = await client.query(
      `SELECT ei.eventId, ei.eventName, ei.eventImage, ei.eventStreet, ei.eventemail, ei.eventDate
      FROM userEvent ue
      INNER JOIN userInfo ui ON ue.userId = ui.userId
      INNER JOIN eventInfo ei ON ue.eventId = ei.eventId
      WHERE ue.userId = $1`,
      [id],
    );
    console.log(events.rows);

    res.json(events.rows);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

//Här applyar man till ett event som användare
router.post('/userevent', async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    await client.query(
      'INSERT INTO userEvent(userId, eventId) VALUES ($1, $2)',
      [userId, eventId],
    );

    res.status(201).json({ message: 'User event created successfully' });
  } catch (err) {
    console.error('Error creating user event:', err);
    res.status(500).json({ error: 'Failed to create user event' });
  }
});

//Här tar man bort ett event man har skapat
router.delete('/creatorevent/:eventid', async (req, res) => {
  const eventid = req.params.eventid;

  try {
    await client.query('DELETE FROM eventInfo WHERE eventid = $1', [eventid]);

    res.json({ message: '123' });
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Failed to remove application' });
  }
});

//Här tar man bort ett event man har applyat till som användare
router.delete('/events/:eventid', async (req, res) => {
  const eventid = req.params.eventid;
  const userid = req.body.userid;

  try {
    await client.query(
      'DELETE FROM userEvent WHERE eventid = $1 AND userid = $2',
      [eventid, userid],
    );

    res.json({ message: 'Application removed successfully' });
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Failed to remove application' });
  }
});

// Hämtar ett event och alla dess deltagare
router.get('/events/participants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const eventQuery = `
      SELECT ei.eventId, ei.eventName, ei.eventImage, ei.eventStreet, ei.eventEmail, ei.eventDate, ei.eventCreator, CONCAT(ec.userFirstName, ' ', ec.userLastName) as eventCreatorName,
      (
        SELECT MAX(eventId)
        FROM eventInfo
        WHERE eventId < $1
      ) as previousEventId,
      (
        SELECT MIN(eventId)
        FROM eventInfo
        WHERE eventId > $1
      ) as nextEventId
      FROM eventInfo ei
      INNER JOIN userInfo ec ON ei.eventCreator = ec.userId
      WHERE ei.eventId = $1`;

    const participantsQuery = `
      SELECT ui.userId, ui.userImgUrl, CONCAT(ui.userFirstName, ' ', ui.userLastName) as userName
      FROM userEvent ue
      INNER JOIN userInfo ui ON ue.userId = ui.userId
      WHERE ue.eventId = $1`;

    const event = await client.query(eventQuery, [id]);
    const participants = await client.query(participantsQuery, [id]);

    if (event.rows.length === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json({
      event: event.rows[0],
      participants: participants.rows,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
});

// Servar alla bilder för event (och just nu också för profilbilder)
router.get('/events/uploads/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '..', 'uploads', filename);

    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

module.exports = router;
