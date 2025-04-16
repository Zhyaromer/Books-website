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
const getUserInfo = require('../../controllers/user/getuserinfo');
const get_user_name_and_pic = require('../../controllers/user/get_user_name_and_pic');
const addsuggestion = require('../../controllers/user/addsuggestion');
const getSuggestion = require('../../controllers/user/getsuggestions');
const suggestionscheck = require('../../controllers/user/suggestionscheck');
const contactEmail = require('../../controllers/user/contactEmail');
const { changepic, upload } = require('../../controllers/user/changeprofilepic');
const  Searching = require('../../controllers/user/Searching');

router.get('/search/:search', Searching);

router.use(verifyToken);

router.get('/getReadBooks', getReadBooks);
router.get('/getSavedBooks', getSavedBooks);
router.get('/getUserComments', getUserComments);
router.get('/bookreadsCheck', bookreadsCheck);
router.get('/booksSaveCheck', booksSaveCheck);
router.get('/getallreviews', getallreviews);
router.get('/returnUserid/:id', userID);
router.get('/getuserinfo', getUserInfo);
router.get('/getusernameandpic', get_user_name_and_pic);
router.get('/getsuggestions', getSuggestion);
router.get('/suggestionscheck', suggestionscheck);

router.post('/addReadBook/:book_id', addReadBook);
router.post('/addReview/:book_id', addReview);
router.post('/addSaveBook/:book_id', addsaveBook);
router.post('/addsuggestion/:book_id', addsuggestion);
router.post("/upload", upload, changepic);
router.patch('/updateReview', updateReview);
router.post('/contactEmail', contactEmail);

router.delete('/removeReview/:review_id', removeReview);

module.exports = router;    