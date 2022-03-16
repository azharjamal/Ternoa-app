require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require("./config/db");

const cors = require('cors');

const booksRoutes = require('./routes/books');
connectDB();
const app = express();

const ports = process.env.PORT || 3000;
app.listen(ports, () => console.log(`Server running on ${ports}`));


app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join('images')));

app.use('/api/books', booksRoutes);