"use strict";

/**
 * Created by yueqingji on 2017/5/16.
 */

var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var text_list = [];
request("http://lvxsw.com/txt/33809/", function (res, error, body) {
    exec_data(body);
});
function exec_data(body) {
    var $ = cheerio.load(body);
    var urls = [];
    $("#part33431").find("a").get().map(function (a) {
        urls.push($(a).attr("href"));
    });
    $("#part33432").find("a").get().map(function (a) {
        urls.push($(a).attr("href"));
    });
    var tt = setInterval(function () {
        var i = 0;
        function get_content() {
            request("http://lvxsw.com" + urls[i], function (res, error, body) {
                print_content(body);
            });
            i++;
            if (i > urls.length) {
                console.log(text_list.join("\n"));
                clearInterval(tt);
            }
        }
        return get_content;
    }(), 1000);
}
function print_content(body) {
    var $ = cheerio.load(body);
    text_list.push($("#main").find("h1").text());
    text_list.push($("#content").text());
}
//# sourceMappingURL=jiaoben.js.map