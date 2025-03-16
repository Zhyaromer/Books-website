require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require("passport");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books/booksRoutes');
const authorsRoutes = require('./routes/authors/authorsRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/user/userRoutes');
const newsRoutes = require('./routes/news/newsRoutes');
const bookSeriesRoutes = require('./routes/book_series/book_seriesRoutes');
const membersRoutes = require('./routes/members/membersRoutes');

// dashboard
const dashboardbooksRoutes = require('./routes/admindashboard/books');
const dashboardauthorsRoutes = require('./routes/admindashboard/authors');
const dashboardseriesRoutes = require('./routes/admindashboard/series');
const dashboardnewsRoutes = require('./routes/admindashboard/news');
const dashboardquotesRoutes = require('./routes/admindashboard/quotes');
const dashboardusersRoutes = require('./routes/admindashboard/users');

const PORT = process.env.PORT || 3001;
const path = require('path');

app.use(cors( {
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
passport.initialize();
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//dashboard
app.use('/booksdashboard', dashboardbooksRoutes);
app.use('/authorsdashboard', dashboardauthorsRoutes);
app.use('/seriesdashboard', dashboardseriesRoutes);
app.use('/newsdashboard', dashboardnewsRoutes);
app.use('/quotesdashboard', dashboardquotesRoutes);
app.use('/usersdashboard', dashboardusersRoutes);


app.use('/auth', authRoutes);
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/bookseries', bookSeriesRoutes);
app.use('/members', membersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});