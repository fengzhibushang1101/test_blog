/**
 * Created by yueqingji on 2017/7/12.
 */
const mongodb = require("./mongo");

Date.prototype.Format = function(fmt) { //author: meizz
    let o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(let k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

function SmtInfo(smt) {
    this.title = smt.name;
    this.price = smt.price;
    this.other = smt.other
}

module.exports = SmtInfo;

SmtInfo.prototype.save = function (callback) {
    let info = {
        name: this.name,
        price: this.price,
        other: this.other,
        "create_time": (new Date()).Format("yyyy-MM-dd hh:mm:ss.S")
    };
    mongodb.open(function(err, db){
        if(err) {
            mongodb.close();
            return callback(err);
        }
        db.collection("smt_info", function(err, collection){
            if(err){
                mongdb.close();
                return callback(err)
            }
            collection.insert(info, {"safe": true}, function(err, user){
                mongodb.close();
                if(err) return callback(err);
                callback(err, user)
            })
        })
    })
};
