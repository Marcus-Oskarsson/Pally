const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/signup', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM userInfo');
  console.log('GETS ALL USERS');
  res.send(rows);
});

router.post('/signup', async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const personalNumber = req.body.personalNumber;
  const password = req.body.password;
  const street = req.body.street;
  const city = req.body.city;
  const zipCode = req.body.zipCode;

  const sql = `INSERT INTO userInfo (userFirstName, userLastName, userEmail, userPhoneNumber, userPersonalNumber, userPassword, userStreet, userCity, userZipCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  const values = [
    firstName,
    lastName,
    email,
    phone,
    personalNumber,
    password,
    street,
    city,
    zipCode,
  ];

  try {
    const result = await client.query(sql, values);
    console.log('YAY');
    console.log('User inserted:', result.rows[0]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log('ERROR');
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
