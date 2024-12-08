const express = require('express');
const {createUser,loginUser} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', createUser)

module.exports = router;