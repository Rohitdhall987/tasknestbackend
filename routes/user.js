const express = require('express');

const router = express.Router();

router.post('/login', function (req, res) {
    res.json({message: 'user details by email'});
});

router.post('/register', (req, res) => {
    res.json({message: 'create new user'});
})

module.exports = router;