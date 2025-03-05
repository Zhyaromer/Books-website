const express = require('express');
const router = express.Router();
const addReadBook = require('../../controllers/user/addReadBook');
const addReview = require('../../controllers/user/addReview');
const addsaveBook = require('../../controllers/user/addsaveBook');
const checkauth = require('../../Middleware/checkauth');
const getReadBooks = require('../../controllers/user/getReadBooks');
const getSavedBooks = require('../../controllers/user/getSavedBooks');
const getUserComments = require('../../controllers/user/getUserComments');
const removeReview = require('../../controllers/user/removeReview');

router.get('/getReadBooks', checkauth, getReadBooks);
router.get('/getSavedBooks', checkauth, getSavedBooks);
router.get('/getUserComments', checkauth, getUserComments);

router.post('/addReadBook', checkauth, addReadBook);
router.post('/addReview', checkauth, addReview);
router.post('/addSaveBook', checkauth, addsaveBook);

router.delete('/removeReview', checkauth, removeReview);


module.exports = router;    