var httpGetUrl = require('./httpGet');
var bearyChatRequest = require('./bearyChatRequest');

async function ip() {
    // var url = "http://2018.ip138.com/ic.asp";
    var url = "http://pv.sohu.com/cityjson?ie=utf-8"
    var ipinfo = await httpGetUrl.httpGet(url);
    var iplist = ipinfo.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g);
    var ip = "未知";
    if (iplist.length > 0) {
        ip = iplist[0];
    }
    console.log("当前IP地址为：" + ip);
    bearyChatRequest.bearyChatRequest("当前IP地址为：" + ip);
}
ip();
