const express = require('express');
const router = express.Router();
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const logout = require('../../controllers/auth/logout');
const { forgotPassword, resetPassword } = require('../../controllers/auth/forgotPassword');
const updateUserInfo = require('../../controllers/auth/changename');
const changeusername = require('../../controllers/auth/changeusername');
const verifyToken = require('../../Middleware/auth');
const changeemail = require('../../controllers/auth/changeemail');
const deleteaccount = require('../../controllers/auth/deleteaccount');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token',verifyToken, resetPassword);
router.post('/updateUserInfo',verifyToken, updateUserInfo);
router.post('/changeusername',verifyToken, changeusername);
router.post('/changeemail',verifyToken, changeemail);
router.post('/deleteaccount',verifyToken, deleteaccount);

module.exports = router;