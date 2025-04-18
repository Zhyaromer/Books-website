const express = require('express');
const router = express.Router();
const getallmemberreviews = require('../../controllers/members/getallmemberreviews');
const getmemberinfo = require('../../controllers/members/getmemberinfo');
const getmemberReadBooks = require('../../controllers/members/getmemberReadBooks');
const getmemberSavedBooks = require('../../controllers/members/getmemberSavedBooks');
const getmembersuggestion = require('../../controllers/members/getmembersuggestion');

router.get('/getallmemberreviews', getallmemberreviews);
router.get('/getmemberinfo', getmemberinfo);
router.get('/getmemberReadBooks', getmemberReadBooks);
router.get('/getmemberSavedBooks', getmemberSavedBooks);
router.get('/getmembersuggestion', getmembersuggestion);

module.exports = router;
