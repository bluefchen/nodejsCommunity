const crypto = require('crypto');

// 打印支持的hash算法
//console.log(crypto.getHashes());

exports.useMD5 = function(value){
    return crypto.createHash('md5').update(value).digest('hex');
}