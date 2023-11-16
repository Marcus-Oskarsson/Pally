const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

const login = require('./routes/login');
app.use(login);

const signup = require('./routes/signup');
app.use(signup);

const event = require('./routes/event');
app.use(event);

const users = require('./routes/users');
app.use(users);

const profile = require('./routes/profile');
app.use(profile);

const friend = require('./routes/friend');
app.use(friend);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Dicker is up n running. GLHF.');
});
