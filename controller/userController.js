/**
 * Created by smagne on 10/18/2016.
 */
var mongoose = require('mongoose');
var models = require('../models/userModel')(mongoose);

var uController = module.exports = {};

uController.login = function (email, password, callback) {
    var result = {
        success: true,
        message: "",
        user: {}
    };

    models.User.findOne({Email: email}, function (err, user) {
        if (!user) {
            result.message = 'Invalid email or password.';
            result.success = false;
        } else {
            if (password === user.Password) {
                result.user = user;
            } else {
                result.message = 'Invalid email or password.';
                result.success = false;
            }
        }
        callback(err, result);
    });
};
