const express = require('express');
const {createUser,loginUser,updateUser} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', createUser);

router.put('/update', updateUser);

module.exports = router;