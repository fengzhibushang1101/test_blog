/**
 * Created by yueqingji on 2017/7/24.
 */
const mongodb = require("./mongo");

function Post(post) {
    this.name = post.name;
    this.title = post.title;
    this.post = post.post
}

module.exports = Post;

Post.prototype.save = function (callback) {
    let date = new Date();
    let time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    let post = {
        name: this.name,
        title: this.title,
        post: this.post,
        time: time
    };
    mongodb.open(function(err, db){
        if(err) {
            mongodb.close();
            return callback(err);
        }
        db.collection("posts", function(err, collection){
            if(err){
                mongdb.close();
                return callback(err)
            }
            collection.insert(post, {"safe": true}, function(err, user){
                mongodb.close();
                if(err) return callback(err);
                callback(err, user)
            })
        })
    })
};

Post.get = function (name, callback) {
    console.log("正在打开mongo连接......");
    mongodb.open(function(err, db){
        if(err) {
            mongodb.close();
            return callback(err);
        }
        console.log("正在打开collection...");
        db.collection("posts", function(err, collection){
            if(err){
                return callback(err)
            }
            collection.find({"name": name}).sort({"time": -1}).toArray(function(err, user){
                mongodb.close();
                if(err) return callback(err);
                callback(err, user)
            })
        })
    })
};