const express = require('express');
const router = express.Router();
const getAllBooks = require('../../controllers/books/getAllBooks');
const getBookById = require('../../controllers/books/getBookById');
const getBooksMainPage = require('../../controllers/books/getBooksMainPage');
const getTrendingBooks = require('../../controllers/books/getTrendingBooks');
const getRandomBooks = require('../../controllers/books/getRandomBooks');
const getBookQuotes = require('../../controllers/books/getBookQuotes');
const getnwewestbooks = require('../../controllers/books/getnwewestbooks');

router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);
router.get('/getBooksMainPage', getBooksMainPage);
router.get('/getTrendingBooks', getTrendingBooks);
router.get('/getRandomBooks', getRandomBooks);
router.get('/getBookQuotes', getBookQuotes);
router.get('/getnwewestbooks', getnwewestbooks);

module.exports = router;