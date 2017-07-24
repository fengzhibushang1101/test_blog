const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require("../models/nosql/user");
const Post = require("../models/nosql/post");

/* GET home page. */

router.get('/', function(req, res) {
    Post.get(req.session.user.name, function (err, posts) {
        if (err) {
            req.flash("error", err);
            posts = [];
        }
        res.render('index', {
            title: '主页',
            user: req.session.user,
            posts: posts,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});
router.get("/reg", checkNotLogin);
router.get("/reg", function(req, res){
  res.render('reg', {
      title: "注册",
      user: req.session.user,
      success: req.flash("success").toString(),
      error: req.flash("error").toString()
  })
});
router.post("/reg", checkNotLogin);
router.post("/reg", function(req, res){
    console.log(req.body);
    let name = req.body.name,
        password = req.body["password"],
        password_re = req.body['password-repeat'];
    if(password != password_re){
        req.flash("error", "两次输入的密码不一致!");
        return res.redirect("/reg");
    }
    let md5 = crypto.createHash('md5'),
        md5_pass = md5.update(password).digest('hex');
    let new_user = new User ({
        "name": name,
        "password": md5_pass,
        "email": req.body.email
    });
    User.get(name, function(err, user){
        if(err){
            req.flash("error", err);
            return res.redirect("/")
        }
        if(user){
            req.flash("error", "用户已存在!");
            return res.redirect("/reg");
        }
        new_user.save(function(err){
            if (err) {
                req.flash("error", err);
                return res.redirect("/reg");
            }
            req.session.user = new_user;
            req.flash("success", "注册成功！");
            res.redirect("/");
        })
    })

});

router.get("/login", checkNotLogin);
router.get("/login", function(req, res, next){
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash("success").toString(),
        error: req.flash("error").toString()
    });
});
router.post("/login", checkNotLogin);
router.post("/login", function(req, res, next){
    let md5 = crypto.createHash("md5"),
        password = md5.update(req.body.password).digest("hex");
    User.get(req.body.name, function(err, user){
        if(!user){
            req.flash("error", "用户不存在!");
            res.redirect("/login");
        }
        if(user.password != password){
            req.flash("error", "密码错误!");
            res.redirect("/login");
        }else{
            req.session.user = user;
            req.flash("success", "登录成功!");
            res.redirect("/");
        }
    })

});
router.get("/post", checkLogin);
router.get("/post", function(req, res, next){
    res.render("post", {
        "title": "发表",
        user: req.session.user,
        success: req.flash("success").toString(),
        error: req.flash("error").toString()
    })
});
router.post("/post", checkLogin);
router.post("/post", function(req,res, next){
    var currentUser = req.session.user,
        post = new Post({
            "name": currentUser.name,
            "title": req.body.title,
            "post": req.body.post
        });
    post.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功!');
        res.redirect('/');
    });

});
router.get("/logout", checkLogin);
router.get("/logout", function(req, res){
    req.session.user = null;
    req.flash("success", "登出成功");
    res.redirect("/");
});


function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        res.redirect('back');
    }
    next();
}

module.exports = router;
