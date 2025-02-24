const express = require('express');
const router = express.Router();
const getAllBooks = require('../../controllers/books/getAllBooks');
const getBookById = require('../../controllers/books/getBookById');
const getBooksMainPage = require('../../controllers/books/getBooksMainPage');

router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);
router.get('/getBooksMainPage', getBooksMainPage);

module.exports = router;