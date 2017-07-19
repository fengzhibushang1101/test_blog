const express = require('express');
const router = express.Router();


let user_index = (req, res, next) => {res.send('repsond with a resource');};

const method_route = [
    ["/", user_index]
];
method_route.map((u_li)=>{router.get(...u_li);});

/* GET users listing. */
router.get('/', function(req, res, next) { res.send('respond with a resource');});

module.exports = router;
