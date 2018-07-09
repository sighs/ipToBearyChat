var https = require('https');
var arg = require('./arg');

var bearyChatRequest = function (title1, title2, text1, color) {
    title1 = title1 || "Title test";
    title2 = title2 || title1;
    // text1 = text1 || "text";
    color = color || "#ffa500";
    let post_data

    if (typeof text1 == "string" && text1.length > 0) {
        post_data = {
            "text": title1,
            "attachments": [
                {
                    "title": title2,
                    "text": text1,
                    "color": color
                }
            ]
        }
    }
    else {
        post_data = {
            "text": title1
        }
    }

    let path;
    let site;
    switch (arg.arg()) {
        default:
            path = "/=bwDaT/incoming/15df6e4b01477e9ef0570a6c47b97f2b";
            break;
    }

    // console.log(arg.arg())
    var options = {
        hostname: "hook.bearychat.com", // 呼叫的域名
        port: 443,				// 端口固定
        path: path,				// 请求的api名称
        method: "POST",			// get和post请求
        json: true,				// 此地方表示json
        rejectUnauthorized: true,  //请校验服务器证书，否则ssl没有意义。
        headers: {
            'Accept': 'application/json;version=2.0',
            'Content-Type': 'application/json',             //此地方和json很有关联，需要注意
        }
    }

    var json = JSON.stringify(post_data);

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(json);

    req.end();
}
exports.bearyChatRequest = bearyChatRequest

// bearyChatRequest("test")