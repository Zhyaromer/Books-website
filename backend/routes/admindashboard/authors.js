const express = require('express');
const router = express.Router();
const getAllAuthors = require('../../controllers/admindashboard/authors/getallauthors');

router.get('/getAllAuthors', getAllAuthors);

module.exports = router;