const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/addNewUser', userController.addNewUser);

router.post('/authenticateUser', userController.authenticateUser);


module.exports = router;
