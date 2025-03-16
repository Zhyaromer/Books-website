const express = require('express');
const router = express.Router();
const getNews = require('../../controllers/admindashboard/news/getnews');
const addnews = require('../../controllers/admindashboard/news/addnews');
const removeNews = require('../../controllers/admindashboard/news/deletenews');
const updatenews = require('../../controllers/admindashboard/news/updatenews');

router.get('/getnews', getNews);

router.post('/addnews', addnews.upload, addnews.addnews);

router.patch('/updatenews/:id', updatenews.upload, updatenews.updatenews);

router.delete('/deletenews/:id', removeNews);

module.exports = router;