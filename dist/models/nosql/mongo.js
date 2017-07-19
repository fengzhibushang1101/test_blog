"use strict";

/**
 * Created by yueqingji on 2017/7/9.
 */
var settings = require("../../settings");
var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Sever = require("mongodb").Server;

module.exports = new Db(settings.db, new Sever(settings.host, settings.port), { "safe": true });
//
//
// let server = new Sever("localhost", 27017);
// let conn =  new Db("blog", server, {"safe": true});
// conn.open(function(err, db){
//     if(err) console.log(err);
//     console.log(123);
//     db.collection("users", {"safe": true},function(err,collection){
//         if(err) throw err ;
//         collection.find().toArray(function(e,docs){
//             if(e) throw e ;
//             console.log(docs) ;
//         }) ;
//     })
// });
//
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // 数据库为 runoob
//
// var insertData = function(db, callback) {
//     //连接到表 site
//     var collection = db.collection('site');
//     //插入数据s
//     var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
//     collection.insert(data, function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }
//         callback(result);
//     });
// }
//
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     insertData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
// });
//
// var mongo = require("mongodb");
// var host = "localhost";
// var port = 27017;
// //创建MongoDB数据库所在服务器的Server对象
// var server2= new mongo.Server(host, port, {auto_reconnect:true});
// //创建MongoDB数据库
// var db = new mongo.Db('node-mongo-example', server2, {safe:true});
// //数据库连接操作
// try{
//     db.open(function(err, db){
//         if(err) {
//             console.log('连接数据库发生错误');
//             throw err;
//         }
//         else{
//             console.log("成功建立数据库连接");
//             db.close();
//         }
//     });
//     db.on('close',function(err,db){
//         if (err) {throw err;}
//         else{
//             console.log("成功关闭数据库");
//         }
//     });
// }catch(e){
//     console.log("123");
//     console.log(e.toString())
// }
//# sourceMappingURL=mongo.js.map