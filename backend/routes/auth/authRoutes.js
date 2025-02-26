const express = require('express');
const router = express.Router();
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const logout = require('../../controllers/auth/logout');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;