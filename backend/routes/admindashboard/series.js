const express = require('express');
const router = express.Router();
const getallseries = require('../../controllers/admindashboard/bookseries/getseries');

router.get('/getallseries', getallseries);

module.exports = router;