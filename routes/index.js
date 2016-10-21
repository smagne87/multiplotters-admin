var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', requireLogin, function (req, res, next) {
    res.render('index');
});

function requireLogin(req, res, next) {
    if (!req.user && !req.session.user) {
        res.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = router;
