// gömmer lösenord
// import bcrypt from 'bcrypt';
// // access tolken
// import crypto from 'crypto';

const express = require('express');
const router = express.Router();
// import { Router } from 'express';
// const router = Router();

const client = require('../connection');

// GETS ALL USERS
router.get('/login', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM userInfo');
  console.log('GET REQUEST ALL FROM USER INFO ');
  res.send(rows);
});

// LOGIN
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT * FROM userInfo WHERE userEmail = $1`;

  // const newAccesstoken = crypto.randomBytes(128).toString('hex');
  // const hashedPassword = bcrypt.hashSync(password, salt);
  // salt = krypterar lösen på samma sätt varje gång

  try {
    await client.query(sql, [email], async (error, results) => {
      if (error) {
        throw error;
      }
      console.log('Login, check password');

      if (password === results.rows[0].userpassword) {
        console.log('Correct password');
        res.send(results.rows[0]);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
