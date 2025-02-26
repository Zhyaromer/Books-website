const express = require('express');
const router = express.Router();
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const logout = require('../../controllers/auth/logout');
const { forgotPassword, resetPassword } = require('../../controllers/auth/forgotPassword');
const updateUserInfo = require('../../controllers/auth/changename');
const changeusername = require('../../controllers/auth/changeusername');
const changeemail = require('../../controllers/auth/changeemail');
const deleteaccount = require('../../controllers/auth/deleteaccount');
const changepassword = require('../../controllers/auth/changepassword');
const checkauth = require('../../Middleware/checkauth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', checkauth, resetPassword);

router.patch('/updateUserInfo', checkauth, updateUserInfo);
router.patch('/changeusername', checkauth, changeusername);
router.patch('/changeemail', checkauth, changeemail);
router.patch('/changepassword', checkauth, changepassword);

router.delete('/deleteaccount', checkauth, deleteaccount);

module.exports = router;