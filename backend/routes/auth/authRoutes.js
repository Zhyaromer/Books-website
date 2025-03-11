const express = require('express');
const router = express.Router();
const verifyToken = require('../../Middleware/verifyToken');
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const { forgotPassword, resetPassword } = require('../../controllers/auth/forgotPassword');
const updateUserInfo = require('../../controllers/auth/changename');
const changeusername = require('../../controllers/auth/changeusername');
const changeemail = require('../../controllers/auth/changeemail');
const deleteaccount = require('../../controllers/auth/deleteaccount');
const changepassword = require('../../controllers/auth/changepassword');
const refreshtoken = require('../../controllers/auth/refreshtoken');
const verifyAuth = require('../../controllers/auth/CheckUserState');
const logout = require('../../controllers/auth/logout');
const changebio = require('../../controllers/auth/changebio');

router.get('/refreshtoken', refreshtoken);
router.get('/verifyAuth', verifyAuth);
router.get('/logout', logout);

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', verifyToken, resetPassword);

router.patch('/updateUserInfo', verifyToken, updateUserInfo);
router.patch('/changeusername', verifyToken, changeusername);
router.patch('/changeemail', verifyToken, changeemail);
router.patch('/changepassword', verifyToken, changepassword);
router.patch('/changebio', verifyToken, changebio);

router.delete('/deleteaccount', verifyToken, deleteaccount);

module.exports = router;