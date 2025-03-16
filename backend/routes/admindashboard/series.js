const express = require('express');
const router = express.Router();
const getallseries = require('../../controllers/admindashboard/bookseries/getseries');
const addseries = require('../../controllers/admindashboard/bookseries/addseries');
const removeSeries = require('../../controllers/admindashboard/bookseries/removeseries');
const updateseries = require('../../controllers/admindashboard/bookseries/updateseries');

router.get('/getallseries', getallseries);

router.post('/addseries', addseries.upload, addseries.addseries);

router.patch('/updateseries/:id', updateseries.upload, updateseries.updateseries);

router.delete('/removeseries/:id', removeSeries);

module.exports = router;