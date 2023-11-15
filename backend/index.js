const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

async function main() {
  try {
    const { rows } = await client.query('SELECT * FROM userInfo');
    console.log('Table created successfully!');
    console.log(rows);
  } catch (error) {
    console.error('Error connecting!');
    console.error(error);
  }
}

main();

// Get all poems
app.get('/', async (_request, response) => {
  console.log('GET-request received for /');
  const { rows } = await client.query('SELECT * FROM userInfo');

  console.log('GET-request received for /api');

  response.send(rows);
});

app.listen(PORT, () => {
  console.log('Dicker is up n running. GLHF.');
});
