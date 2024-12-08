const express = require('express');

const router = express.Router();

router.post('/login', function (req, res) {
    res.json({message: 'use details by email'});
});

router.post('/register', (req, res) => {
    res.json({message: 'create new user'});
})

module.exports = router;