const express = require('express');
const router = express.Router();
const getusers = require('../../controllers/admindashboard/users/getusers');
const adduser = require('../../controllers/admindashboard/users/adduser');
const deleteUser = require('../../controllers/admindashboard/users/deleteuser');
const updateuser = require('../../controllers/admindashboard/users/updateusers');

router.get('/getusers', getusers);

router.post('/adduser', adduser.upload, adduser.adduser);

router.patch('/updateuser/:id', updateuser.upload, updateuser.updateuser);

router.delete('/deleteuser/:id', deleteUser);

module.exports = router;