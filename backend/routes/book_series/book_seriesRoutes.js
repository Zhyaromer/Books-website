const express = require('express');
const router = express.Router();
const getallbookseries = require('../../controllers/book_series/getallbookseries');
const getseriesbooksbyid = require('../../controllers/book_series/getseriesbooksbyid');

router.get('/getAllBookSeries', getallbookseries);
router.get('/getBookSeriesById/:id', getseriesbooksbyid);

module.exports = router;