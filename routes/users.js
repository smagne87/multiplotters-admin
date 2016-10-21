var express = require('express');
var path = require('path');
var userController = require('../controller/userController');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/logout', requireLogin, function (req, res, next) {
    req.session.regenerate(function () {
        res.redirect('/');
    });
});

router.get('/login', function (req, res, next) {
    res.render(path.join(__dirname, '../views/users/login'), {error: ""});
});


router.post('/login', function (req, res, next) {
    userController.login(req.body.email, req.body.password, function (err, result) {
        if (result.success) {
            //req.session.regenerate(function() {
            req.session.user = result.user;
            res.redirect('/');
            //});
        } else {
            res.render(path.join(__dirname, '../views/users/login'), {error: result.message});
        }
    });
});


function requireLogin(req, res, next) {
    if (!req.user && !req.session.user) {
        res.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = router;
