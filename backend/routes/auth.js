// import { Router } from 'express';
// import { connection } from '../.connection.js';
const express = require('express');
const client = require('../connection');
const router = express.Router();

router.get('/checkAuth', async (req, res) => {
  const accesstoken = req.header('Authorization');
  const sql = `
  SELECT u.user_expires FROM user u
  WHERE u.user_accesstoken = $1`;

  try {
    await client.query(sql, [accesstoken], (error, results) => {
      if (error) {
        throw error;
      }
      if (results[0]) {
        const valid = results[0]?.user_expires ?? 0 > new Date();

        if (valid) {
          res.json({ success: true, authenticated: true, accesstoken });
        } else {
          res.json({ success: true, authenticated: false, accesstoken });
        }
      }
    });
  } catch (error) {
    res.status(418).json({ success: false, error });
  }
});

module.exports = router;
