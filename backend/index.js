const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

const login = require('./routes/login');
app.use(login);

const event = require('./routes/event');
app.use(event);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Dicker is up n running. GLHF.');
});
