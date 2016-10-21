/**
 * Created by smagne on 10/20/2016.
 */
var mongoose = require('mongoose');
var models = require('../models/supplyModel')(mongoose);

var supplyController = module.exports = {};

supplyController.deleteSupply = function (idSupply, callback) {
    var result = {
        success: true
    };

    models.Supply.remove({_id: idSupply}, function (err) {
        if (err) console.log(err);

        result.success = true;
        callback(err, result);
    });
};

supplyController.saveSupply = function (idSupply, name, type, width, length, category, price, callback) {
    var result = {
        success: true,
        message: "",
        supply: {}
    };
    if (idSupply === "") {
        idSupply = null;
    }
    models.Supply.findOne({_id: idSupply}).exec(function (err, supply) {
        if (err) {
            result.success = false;
            callback(err, result);
        }
        else if (!supply) {
            supply = new models.Supply();
        }
        supply.Name = name;
        supply.Type = type;
        supply.Width = width;
        supply.Length = length;
        supply.Category = category;
        supply.Price = price;
        supply.save(function (err) {
            if (err) {
                console.log(err);
                result.success = false;
                result.message = 'Unexpected error!';
            }
            else {
                result.supply = supply;
            }
            callback(err, result);
        });
    });
};

supplyController.getAllSupplies = function (searchText, currentPage, pageSize, callback) {
    var result = {
        success: true,
        message: "",
        supplies: [],
        total: 0
    };

    models.Supply.find({Name: new RegExp(searchText, "i")})
        .skip(parseInt(currentPage))
        .limit(parseInt(pageSize))
        .exec(function (err, supplies) {
            if (err) {
                result.message = err;
                result.success = false;
            } else {
                for (var i = 0; i < supplies.length; i++) {
                    var sup = supplies[i];
                    result.supplies.push([
                        sup.Name,
                        sup.Type,
                        sup.Category,
                        "<a class='edit-item' href='#' data-id='" + sup._id + "'>Editar</a> | <a class='delete-item' data-open='deleteModal' href='#' data-id='" + sup._id + "'>Borrar</a>"
                    ]);
                }
                models.Supply.count({Name: new RegExp(searchText, "i")}, function (err, count) {
                    result.success = true;
                    result.total = count;
                    callback(err, result);
                });
            }
        });
};

supplyController.getSupply = function (supplyId, callback) {
    var result = {
        success: true,
        message: "",
        supply: {}
    };

    models.Supply.findOne({_id: supplyId})
        .exec(function (err, supply) {
            if (err) {
                result.message = err;
                result.success = false;
            } else {
                result.success = true;
                result.supply = supply;
                callback(err, result);
            }
        });
};
