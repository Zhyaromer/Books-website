const express = require('express');
const router = express.Router();
const getNews = require('../../controllers/admindashboard/news/getnews');

router.get('/getnews', getNews);

module.exports = router;