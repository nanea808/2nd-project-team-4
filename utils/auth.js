const express = require('express');
const router = require('express').Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;