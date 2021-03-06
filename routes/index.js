const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require("../models/nosql/user");
const Post = require("../models/nosql/post");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: '../public/images/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

/* GET home page. */
router.get("/", checkLogin);
router.get('/', function(req, res) {
    Post.get_all(req.session.user.name, function (err, posts) {
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
router.get("/login", function(req, res){
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash("success").toString(),
        error: req.flash("error").toString()
    });
});
router.post("/login", checkNotLogin);
router.post("/login", function(req, res){
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
router.get("/post", function(req, res){
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
router.get("/upload", checkLogin);
router.get('/upload', (req, res)=>{
    res.render('upload', {
        title: '文件上传',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post("/upload", checkLogin);
router.post('/upload', multer({ storage: storage }).fields([
    {name: 'file1'},
    {name: 'file2'},
    {name: 'file3'},
    {name: 'file4'},
    {name: 'file5'}
]),function(req, res){
    for(var i in req.files){
        console.log(req.files[i]);
    }
    req.flash('success', '文件上传成功!');
    res.redirect('/upload');
});
router.get('/u/:name', checkLogin);
router.get('/u/:name', function(req, res){
    User.get(req.params.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/');//用户不存在则跳转到主页
        }
        //查询并返回该用户的所有文章
        Post.get_all(user.name, function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.reload();
            }
            res.render('user', {
                title: user.name,
                posts: posts,
                user : req.session.user,
                success : req.flash('success').toString(),
                error : req.flash('error').toString()
            });
        });
    });
});
router.get('/u/:name/:day/:title', checkLogin);
router.get('/u/:name/:day/:title', function (req, res) {
    Post.get(req.params.name, req.params.day, req.params.title, function (err, post) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('article', {
            title: req.params.title,
            post: post,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
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
