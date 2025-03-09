const express = require('express');
const router = express.Router();
const addReadBook = require('../../controllers/user/addReadBook');
const addReview = require('../../controllers/user/addReview');
const addsaveBook = require('../../controllers/user/addsaveBook');
const verifyToken = require('../../Middleware/verifyToken');
const getReadBooks = require('../../controllers/user/getReadBooks');
const getSavedBooks = require('../../controllers/user/getSavedBooks');
const getUserComments = require('../../controllers/user/getUserComments');
const removeReview = require('../../controllers/user/removeReview');
const bookreadsCheck = require('../../controllers/user/bookreadsCheck');
const booksSaveCheck = require('../../controllers/user/booksSaveCheck');
const getallreviews = require('../../controllers/user/getallreviews');
const userID = require('../../controllers/user/returnUserid');
const updateReview = require('../../controllers/user/updateReviews');

router.use(verifyToken);

router.get('/getReadBooks', getReadBooks);
router.get('/getSavedBooks', getSavedBooks);
router.get('/getUserComments', getUserComments);
router.get('/bookreadsCheck', bookreadsCheck);
router.get('/booksSaveCheck', booksSaveCheck);
router.get('/getallreviews', getallreviews);
router.get('/returnUserid/:id', userID);

router.post('/addReadBook/:book_id', addReadBook);
router.post('/addReview/:book_id', addReview);
router.post('/addSaveBook/:book_id', addsaveBook);

router.patch('/updateReview', updateReview);

router.delete('/removeReview/:review_id', removeReview);

module.exports = router;    