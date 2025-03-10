const express = require('express');
const router = express.Router();
const getallbookseries = require('../../controllers/book_series/getallbookseries');
const getseriesbooksbyid = require('../../controllers/book_series/getseriesbooksbyid');
const getseriesmainpage = require('../../controllers/book_series/getseriesmainpage');

router.get('/getAllBookSeries', getallbookseries);
router.get('/getBookSeriesById/:id', getseriesbooksbyid);
router.get('/getseriesmainpage', getseriesmainpage);

module.exports = router;