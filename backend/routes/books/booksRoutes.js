const express = require('express');
const router = express.Router();
const getAllBooks = require('../../controllers/books/getAllBooks');
const getBookById = require('../../controllers/books/getBookById');

router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);

module.exports = router;