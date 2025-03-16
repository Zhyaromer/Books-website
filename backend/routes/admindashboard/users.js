const express = require('express');
const router = express.Router();
const getusers = require('../../controllers/admindashboard/users/getusers');

router.get('/getusers', getusers);

module.exports = router;