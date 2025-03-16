const express = require('express');
const router = express.Router();
const getquotes = require('../../controllers/admindashboard/quotes/getquotes');
const addquote = require('../../controllers/admindashboard/quotes/addquote');
const deleteqoute = require('../../controllers/admindashboard/quotes/deleteqoute');
const updateQuotes = require('../../controllers/admindashboard/quotes/updatequotes');

router.get('/getquotes', getquotes);

router.post('/addquote', addquote);

router.patch('/updatequote/:id', updateQuotes);

router.delete('/deleteqoute/:id', deleteqoute);

module.exports = router;