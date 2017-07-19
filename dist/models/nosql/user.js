"use strict";

/**
 * Created by yueqingji on 2017/7/12.
 */
var mongodb = require("./mongo");

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        db.collection("users", function (err, collection) {
            if (err) {
                mongdb.close();
                return callback(err);
            }
            collection.insert(user, { "safe": true }, function (err, user) {
                mongodb.close();
                if (err) return callback(err);
                callback(err, user);
            });
        });
    });
};

User.get = function (name, callback) {
    console.log("正在打开mongo连接......");
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        console.log("正在打开collection...");
        db.collection("users", function (err, collection) {
            if (err) {
                return callback(err);
            }
            collection.findOne({ "name": name }, function (err, user) {
                mongodb.close();
                if (err) return callback(err);
                callback(err, user);
            });
        });
    });
};
//# sourceMappingURL=user.js.map