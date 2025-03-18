const express = require('express');
const router = express.Router();

const getcomments = require('../../controllers/admindashboard/comments/allcomments');
const deletecomment = require('../../controllers/admindashboard/comments/deletecomment');

router.get('/getcomments', getcomments);

router.delete('/deletecomment/:id', deletecomment);

module.exports = router;