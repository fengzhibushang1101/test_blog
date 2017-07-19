'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var express = require('express');
var router = express.Router();

var user_index = function user_index(req, res, next) {
    res.send('repsond with a resource');
};

var method_route = [["/", user_index]];
method_route.map(function (u_li) {
    router.get.apply(router, _toConsumableArray(u_li));
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
//# sourceMappingURL=users.js.map