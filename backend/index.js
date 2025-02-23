require("dotenv").config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books/booksRoutes');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});