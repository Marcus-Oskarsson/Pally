const express = require('express');
const router = express.Router();
// import { Router } from 'express';
// const router = Router();

const client = require('../connection');

//users
router.get('/users', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM userInfo');
  console.log('GET REQUEST ALL FROM USER INFO ');
  res.send(rows);
});
