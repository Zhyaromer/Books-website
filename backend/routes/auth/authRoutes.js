const express = require('express');
const router = express.Router();
const signup = require('../../controllers/auth/signup');

router.post('/signup', signup);

module.exports = router;