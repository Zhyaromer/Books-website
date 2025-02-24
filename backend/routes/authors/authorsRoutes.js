const express = require('express');
const router = express.Router();
const getAllAuthors = require('../../controllers/authors/getAllAuthors');
const getFamousAuthors = require('../../controllers/authors/getFamousAuthors');
const getAuthorById = require('../../controllers/authors/getAuthorById');

router.get('/getallauthors', getAllAuthors);
router.get('/getfamousauthors', getFamousAuthors);
router.get('/getAuthorById/:id', getAuthorById);

module.exports = router;