require("dotenv").config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books/booksRoutes');
const authorsRoutes = require('./routes/authors/authorsRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});