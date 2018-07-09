//根据url返回访问结果
var http = require("http");
var httpGet = function (options) {
    return new Promise((resolve, reject) => {
        if (!options) {
            var err = { "code": 0, "msg": "url不正确。" }
            resolve(`{ "ok": false, "err": ${JSON.stringify(err)} }`);
            return;
        }
        let ret = false;
        try {
            http.get(options, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                let error;
                if (statusCode !== 200) {
                    error = new Error('请求失败。\n' +
                        `状态码: ${statusCode}`);
                }
                //临时注释 应该有的
                // else if (!/^application\/json/.test(contentType)) {
                //     error = new Error('无效的 content-type.\n' +
                //         `期望 application/json 但获取的是 ${contentType}`);
                // }
                if (error) {
                    // console.error();
                    var err = { "code": 0, "msg": error.message }
                    resolve(`{ "ok": false, "err": ${JSON.stringify(err)} }`);
                    // 消耗响应数据以释放内存
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        // const parsedData = JSON.parse(rawData);
                        // console.log(rawData);
                        ret = true;
                        resolve(rawData);
                        // console.log(parsedData);
                    } catch (e) {
                        // console.error(e.message);
                        // reject(rawData);
                        var err = { "code": 0, "msg": e.message }
                        resolve(`{ "ok": false, "err": ${JSON.stringify(err)} }`);
                    }
                });
            }).on('error', (e) => {
                // console.error(`错误: ${e.message}`);
                var err = { "code": 0, "msg": e.message }
                resolve(`{ "ok": false, "err": ${JSON.stringify(err)} }`);
            });
        } catch (e) {
            var err = { "code": 0, "msg": e.message }
            resolve(`{ "ok": false, "err": ${JSON.stringify(err)} }`);
        }
        // return ret;
    })
}

exports.httpGet = httpGet
