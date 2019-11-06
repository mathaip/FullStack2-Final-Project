const express = require('express');
const router = express.Router();
const path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');




/* GET home page. */
router.get('/', forwardAuthenticated, (req, res, ) => res.render('layout'));
router.get('/dashboard', ensureAuthenticated, (req, res, ) =>
    res.render('dashboard', {
        user: req.user
    })
);
router.get('/about', (req, res) => res.render('about'));

module.exports = router;