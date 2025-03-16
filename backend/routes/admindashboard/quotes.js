const express = require('express');
const router = express.Router();
const getquotes = require('../../controllers/admindashboard/quotes/getquotes');

router.get('/getquotes', getquotes);

module.exports = router;