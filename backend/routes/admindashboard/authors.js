const express = require('express');
const router = express.Router();
const getAllAuthors = require('../../controllers/admindashboard/authors/getallauthors');
const addAuthor = require('../../controllers/admindashboard/authors/addauthor');
const removeAuthor = require('../../controllers/admindashboard/authors/deleteauthor');
const updateAuthor = require('../../controllers/admindashboard/authors/updateauthor');

router.get('/getAllAuthors', getAllAuthors);

router.post('/addAuthor', addAuthor.upload, addAuthor.addAuthor);

router.patch('/updateAuthor/:id', updateAuthor.upload, updateAuthor.updateAuthor);

router.delete('/removeAuthor/:id', removeAuthor);

module.exports = router;