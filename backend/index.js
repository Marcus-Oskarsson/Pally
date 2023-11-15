const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// Get all poems
app.get('/', async (_request, response) => {
  const { rows } = await client.query('SELECT * FROM userInfo');

  console.log('GET-request received for /api');

  response.send(rows);
});

app.listen(3000, () => {
  console.log('Dicker is up n running. GLHF.');
});
