const express = require('express');
const router = express.Router();
const getAllNews = require('../../controllers/news/getallnews');
const getNewsById = require('../../controllers/news/getnewsbyid');
const getnewestnews = require('../../controllers/news/getnewestnews');
const incrementnewsview = require('../../controllers/news/incrementnewsview');

router.get('/getAllNews', getAllNews);
router.get('/getNewsById/:id', getNewsById);
router.get('/getnewestnews', getnewestnews);
router.get('/incrementnewsview/:id', incrementnewsview);

module.exports = router;