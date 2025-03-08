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

router.use(verifyToken);

router.get('/getReadBooks', getReadBooks);
router.get('/getSavedBooks', getSavedBooks);
router.get('/getUserComments', getUserComments);
router.get('/bookreadsCheck', bookreadsCheck);
router.get('/booksSaveCheck', booksSaveCheck);

router.post('/addReadBook/:book_id', addReadBook);
router.post('/addReview', addReview);
router.post('/addSaveBook/:book_id', addsaveBook);

router.delete('/removeReview', removeReview);

module.exports = router;    