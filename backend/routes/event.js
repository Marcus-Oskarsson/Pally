const express = require('express');
const router = express.Router();
const client = require('../connection');

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
router.post('/events', async (req, res) => {
  try {
    const { eventName, eventImage, eventStreet, eventEmail, eventDate } =
      req.body;

    const query = `
      INSERT INTO eventInfo(eventName, eventImage, eventStreet, eventEmail, eventDate)
      VALUES($1, $2, $3, $4, $5) RETURNING * `;
    const values = [eventName, eventImage, eventStreet, eventEmail, eventDate];

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

//Här tar man bort ett event man har applyat till som användare
router.delete('/events/:eventid', async (req, res) => {
  const eventid = req.params.eventid;

  try {
    await client.query('DELETE FROM userEvent WHERE eventid = $1', [eventid]);

    res.json({ message: '123' });
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Failed to remove application' });
  }
});

module.exports = router;
