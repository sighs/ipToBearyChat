var arg = function (argIndex) {
    argIndex = argIndex || 2;
    let ret = "";
    process.argv.forEach(function (val, index, array) {
        if (argIndex == index) {
            ret = val;
        }
    });
    return ret;
}
exports.arg = arg
// console.log(arg())

