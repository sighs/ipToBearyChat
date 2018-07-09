var httpGetUrl = require('./src/httpGet');
var bearyChatRequest = require('./src/bearyChatRequest');
var arg = require("./src/arg");
var moment = require("moment");
var schedule = require('node-schedule');

async function ip() {
    var url1 = "http://2018.ip138.com/ic.asp";
    var ipinfo1 = await httpGetUrl.httpGet(url1);
    var iplist = ipinfo1.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g);
    var iptext = "未知";
    if (iplist != null) {
        iptext = "当前IP地址为：" + iplist[0];
    } else {
        var url2 = "http://pv.sohu.com/cityjson?ie=utf-8"
        var ipinfo2 = await httpGetUrl.httpGet(url2);
        iplist = ipinfo2.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g);
        if (iplist != null) {
            iptext = "当前IP地址为：" + iplist[0];
        } else {
            iptext = "2个ip站都挂了，那有什么办法呢~"
        }
    }
    console.log(iptext);
    bearyChatRequest.bearyChatRequest(iptext);
}

function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

function DoCron() {
    var doloop = arg.arg();
    doloop = doloop || "test"
    var loops = ["0", "1", "2", "3", "4", "6", "8", "12", "24"]
    if (isInArray(loops, doloop)) {
        var looptext = '* * 0 * * *';
        switch (doloop) {
            case "0":
                var looptext = arg.arg(3) || '* * 0 * * *';
                break;
            case "1":
                looptext = '* * 0 * * *';
                break;
            case "2":
                looptext = '* * 0,12 * * *';
                break;
            case "3":
                looptext = '* * 0,8,16 * * *';
                break;
            case "4":
                looptext = '* * 0,6,12,18 * * *';
                break;
            case "6":
                looptext = '* * 0,4,8,12,16,20 * * *';
                break;
            case "8":
                looptext = '* * 0,3,6,9,12,15,18,21 * * *';
                break;
            case "12":
                looptext = '* * 0,2,4,6,8,10,12,14,16,18,20,22 * * *';
                break;
            case "24":
                looptext = '* 0 * * * *';
                break;
            default:
                break;
        }

        console.log("服务开始，需要中断请按Ctrl+C。")
        console.log("定时任务规则：" + looptext)
        schedule.scheduleJob(looptext, function () {
            console.log('\nTask begin on ' + moment().format("YYYY-MM-DD HH:mm:ss"));
            ip();
        });
    }
    else {
        ip(); //不数组中，只执行一次
    }
}


DoCron();

//常规使用
//node index.js 
//or
//node index.js 0

//1次使用
//node index.js 1

//常规使用带bearyChat路径
//node index.js 0 path
