const express = require('express');
const router = express.Router();
const getAllBooks = require('../../controllers/books/getAllBooks');
const getBookById = require('../../controllers/books/getBookById');
const getBooksMainPage = require('../../controllers/books/getBooksMainPage');
const getTrendingBooks = require('../../controllers/books/getTrendingBooks');

router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);
router.get('/getBooksMainPage', getBooksMainPage);
router.get('/getTrendingBooks', getTrendingBooks);

module.exports = router;