require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require("passport");
const cookieParser = require('cookie-parser');
const verifyToken = require('./Middleware/verifyToken');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books/booksRoutes');
const authorsRoutes = require('./routes/authors/authorsRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/user/userRoutes');
const newsRoutes = require('./routes/news/newsRoutes');
const bookSeriesRoutes = require('./routes/book_series/book_seriesRoutes');
const PORT = process.env.PORT || 3001;

app.use(cors( {
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
passport.initialize();
app.use(cookieParser());

app.use('/auth', authRoutes);

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/bookseries', bookSeriesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});