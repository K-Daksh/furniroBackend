const express = require('express');
const cors = require('cors');
const json = require('body-parser').json;
const urlencoded = require('body-parser').urlencoded;
const dotenv = require('dotenv');
const connectToDb = require('./db/db');
const furnitureRoutes = require('./routes/furniture.routes');

const app = express();

connectToDb();

dotenv.config();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/furniture', furnitureRoutes);

module.exports = app;