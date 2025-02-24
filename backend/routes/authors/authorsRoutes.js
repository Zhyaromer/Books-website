const express = require('express');
const router = express.Router();
const getAllAuthors = require('../../controllers/authors/getAllAuthors');

router.get('/getallauthors', getAllAuthors);

module.exports = router;