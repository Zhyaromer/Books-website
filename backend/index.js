require("dotenv").config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const db = require('./config/sql/sqlConfig');
const authors = require('./Models/authors');
const book_series = require('./Models/book_series');
const books = require('./Models/books');
const quotes = require('./Models/quotes');
const reviews = require('./Models/reviews');
const users = require('./Models/users');
const user_reads = require('./Models/user_reads');
const user_saves = require('./Models/user_saves');

user_saves();

user_reads();

users();
reviews();
quotes();
books();
authors();
book_series();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});