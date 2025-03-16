const express = require('express');
const router = express.Router();

const getallbooks = require('../../controllers/admindashboard/books/getallbooks');
const { addNewBook, upload } = require('../../controllers/admindashboard/books/addnewbook');
const removeBook = require('../../controllers/admindashboard/books/removebook');
const updatebooks = require('../../controllers/admindashboard/books/updatebooks');

router.get('/getallbooks', getallbooks);

router.post('/addnewbook', upload, addNewBook);

router.patch('/updatebook/:id', updatebooks.upload , updatebooks.updateBook);

router.delete('/removebook/:id', removeBook);

module.exports = router;