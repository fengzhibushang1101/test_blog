/**
 * Created by Administrator on 2017/7/22 0022.
 */


const SmtInfo = require("../models/nosql/smt_info");
const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
let headers = {
    "cookie": "ali_apache_id=11.227.7.179.1498636463191.044798.6; ali_beacon_id=11.227.7.179.1498636463191.044798.6; _uab_collina=150071590965792391510198; _umdata=A502B1276E6D5FEF6685E961A489F7D14909BB1B9150C44E600207018EAA3EADA817D8F30561DCEBCD43AD3E795C914C2434981F362C5B941B691527C7802C00; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%0932595482540%0932799174552; JSESSIONID=30FF7B97C4412A9FFEC331824AB355FA; _mle_tmp0=eNrz4A12DQ729PeL9%2FV3cfUx8KvOTLFSMjZwczN3sjR3NjExNHK0dHNzdTY2NrQwMnF0MjY1dXNU0kkusTI0NTAwNzQ3MTQxMzfTSUxGE8itsDKojQIAnk4X2Q%3D%3D; cna=0K7ZD8EfQicCAXL2sJuPHSdX; _hvn_login=4; aep_common_f=3RlaW2qCMaMIGck/j17Ojry55/84I4p/UUiXuZkWojYkZo38vE0ZgA==; acs_usuc_t=acs_rt=28ec574fca9c40c5b97a3fd53543cccf&x_csrf=zi4khur86zwe; xman_us_t=x_lid=cn1513014312&sign=y&x_user=6xEnDd9r5eoHT2Ac/fy9NCTUphAgDxK97SxHs+oqbiE=&ctoken=lu94aj6j3u05&need_popup=y&l_source=aliexpress; xman_f=eldG2CGPOHAYz8bvnDrBdAIpn3B8+Ao8NFSkP2fHmwA7DD/QcBqhc8eK1S2KQgymKslCOnsAEuIiCoVT0zGo03nFAQtitu2IIvp8QCnUFPM0SAV7jPg/KOx4EV7QVVGfj3nsPK/3Hlw8amGUiA+ydNzuSOj+HsRYDkaAcmbpCn+Hm8jdtk0gxnJfOXX5y0M9qNmbDso1yVa6Rji2N2KJstIGQIstbUXBMidc9GYHBHdRwri/AzSgjzJ52EfrP+SqnNMroyxri2S9Gbg4hlpY4QXJL5CZNvKRYbYpOjQVLvAYMgT1P1hddY3CE8XuTvv+INksJNmwJPEQUx9gG3aFvY122xjUCWNkuvCTuAXW/Cf943MkTLnPXH2A3Vma16s1gdG/LupT7syr0lqULdE6Sw==; xman_us_f=x_l=1&x_locale=en_US&no_popup_today=n&x_user=CN|Sng|Melody|cnfm|223075088&zero_order=y&last_popup_time=1500719534787; intl_locale=en_US; aep_usuc_f=site=glo&region=US&b_locale=en_US&iss=y&isfm=y&c_tp=USD&x_alimid=223075088; intl_common_forever=xt+mtxP9chnWaYsqkpJDAI57xIgof4ERXAgm4Pd6aiRzl43QoybVLg==; _ga=GA1.2.761315589.1498636466; _gid=GA1.2.1949419087.1500715935; isg=AoWF8G0CcHfYu1QLlyvd-jDAlMF_6ji8858gH4fqQ7zLHqWQT5JJpBP0XHUS; ali_apache_track=mt=2|ms=|mid=cn1513014312; ali_apache_tracktmp=W_signed=Y; xman_t=l/d5TuZzb7KeO66n+TprprKnxPtfdbvB1b07WSK6b8wTVYO7WJ+Tjy4mtSRORbO6cha+9nyjomF8h9Gktu55vQa9Ghh9z3FFha4z07vIOE8TiA7MCsHS8h/5scqcFFroDUIk14EGkSWvrgGdl8q6GbswRvS2ts9rdleRgm0iWL02Tmw4cjk8cvd1CAfCDrXrRXJIJ2RXBtn2ZGgMFIp6l5aqrCpCgQQlcOIy5dgpJqvAaCk4DXlu4WldRWZgnXfOklc1tDRswRi/N/NxpD9F+zNEUNLBiVKVvFdi2M2l4lLP4IXWg+6F5KLNF2S7qE+kl2Yr1vFa2HK26e8iBBFCk2Xw4guGZJCm0LnnRniarX9j1HGFt4ZxlSkiV15UMWqRGpiCXLeeeYR5jslf+brzRv1/cH2mQKZnzv0WP+ax8MQM1b1T+CJoQuUVeGywj7sUTRbACbDiaqwZzx0+G5B4I7GNFFXjsvOAKh/DWVVofQOvZjc/7MFAArBnawHrEjbMZ9Jj8MQ95WDDMkeTwJvpTeorvwaPAd4ZbzxnndGlVfsBPMSDXCjUUfjOyLqWj6QKZrOnuyjks2MYfNRdkoCmmqFMg7ENdBtXSuYJTyciIKWWy7Uyt3jdIywEwb8jvsrbIHjvbyKVZ1/dl7MUGqpgTw==",
    "referer": "https://login.aliexpress.com/?from=sm&return_url=https%3A%2F%2Fcnsec.aliexpress.com%2Fquery.htm%3Faction%3DQueryAction%26event_submit_do_login%3Dok%26smApp%3Dglobalsearch%26smPolicy%3Dglobalsearch-globalsearch_category-anti_Spider-htmlrewrite-checklogin%26smCharset%3DUTF-8%26smTag%3DMTE0LjI1MC43Mi4xODcsLGRiMzRmYzZmMGFkZjQzNWJiOGI0MGZkYTZjZWY5MjM0%26smReturn%3Dhttps%253A%252F%252Fwww.aliexpress.com%252Fcategory%252F200003482%252Fdresses%252F1.html%26smSign%3D%252BDkT9WRU%252F61VG4Ix3fwCig%253D%253D%26smLocale%3Den_US",
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
};

let url_list = [];

let tt_page = 0;
let tt_single = 0;
let page_num = 1;
let single_num = 0;
let first_page = 'https://www.aliexpress.com/category/200003482/dresses/1.html';
let page_list = [];


const excute_mongo_err = function(err){
    console.log(err);
};
const excute_single = function (err, res, body) {
    console.log("已采集数量为"+single_num);
    console.log("剩余采集数量为"+url_list.length);
    let $ = cheerio(body);
    console.log($.find("#j-sku-price").text());
    console.log($.find(".product-name").text());
    if ($.find("#j-sku-price").length == 0) console.log("已经被屏蔽。。。。。。");
    else{
        let smt_info = new SmtInfo({
            "price": $.find("#j-sku-price").text(),
            "title": $.find(".product-name").text(),
            "other": ""
        });
        smt_info.save(excute_mongo_err);
    }
};

const excute_list_page = function(err, res, body){
    let $ = cheerio(body);
    let _url_list = $.find(".list-item").find(".pic").find("a").get().map(a=>a.attribs.href);
    let _page_list = $.find("#pagination-bottom").find(".util-left").find("a").get().map(a=>a.attribs.href);
    if (_page_list.length == 0){
        console.log("已经到达尾页或被屏蔽");
        console.log("_________________");
    }
    for(let i=0; i<_page_list.length; i++) if(page_list.indexOf(_page_list[i]) == -1) page_list.push(_page_list[i]);
    for(let i=0; i<_url_list.length; i++) if(url_list.indexOf(_url_list[i]) == -1) url_list.push(_url_list[i]);
    if(!tt_page){
        tt_page = setInterval(function(){
            let page_url = page_list.pop();
            if (!page_url){
                clearInterval(tt_page);
            }else{
                page_num += 1;
                console.log("正在抓取第"+page_num+"页产品");
                easy_request(page_url, excute_list_page);
            }
        }, 15000)
    }
    if(!tt_single){
        tt_single = setInterval(function(){
            let s_url = url_list.pop();
            if (!s_url){
                clearInterval(tt_single);
            }else{
                single_num += 1;
                console.log("正在抓取第"+single_num+"个产品");
                easy_request(s_url, excute_single);
            }
        }, 15000)
    }
    console.log("已采集页数为"+page_num);
    console.log("剩余页数为"+page_list.length);
};



let easy_request = function(url, callback){
    if(url.indexOf("http") == -1) url = "https:"+ url;
    var options = {
        url: url,
        headers: headers
    };
    request(options, callback);
};

//request("https://www.aliexpress.com/item/2017-New-Summer-Striped-Dresses-Women-T-Shirt-Dress-Slash-Neck-Off-shoulder-Bodycon-Dress-Vestidos/32799174552.html", excute_single);
easy_request(first_page, excute_list_page);