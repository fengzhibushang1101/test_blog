const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require("../models/nosql/user");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '主页' });
});
router.get("/reg", function(req, res){
  res.render('reg', { title: "注册"})
});
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
router.get("/login", function(reg, res, next){
  res.render("login", {"title": "登陆"})
});
router.post("/login", function(req, res, next){
});
router.get("/post", function(req, res, next){
    res.render("post", {"title": "发表"})
});
router.post("/post", function(req,res, next){});
router.get("/logout", function(req, res){});


module.exports = router;
