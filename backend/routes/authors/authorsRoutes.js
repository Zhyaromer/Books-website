const express = require('express');
const router = express.Router();
const getAllAuthors = require('../../controllers/authors/getAllAuthors');
const getFamousAuthors = require('../../controllers/authors/getFamousAuthors');

router.get('/getallauthors', getAllAuthors);
router.get('/getfamousauthors', getFamousAuthors);

module.exports = router;