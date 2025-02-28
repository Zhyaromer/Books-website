require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require("passport");
const verifyToken = require('./Middleware/verifyToken');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books/booksRoutes');
const authorsRoutes = require('./routes/authors/authorsRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/user/userRoutes');
const PORT = process.env.PORT || 3001;

app.use(cors( {
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
passport.initialize();

app.use(verifyToken); 

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});