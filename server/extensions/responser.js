// 为res添加自定义的快捷响应方法
module.exports = function () {
    return function (req, res, next) {
        
        res.apiSuccess = function (msg) {
            res.json({flag: 1, msg: msg})
        }

        res.apiError = function (err) {
            console.error(err)
            if (err.name == 'AssertError') {
                res.json({flag: 0, msg: err.message})
            }
            else {
                res.json({flag: 0, msg: '服务端在想妹子嘞，请稍后再试'})
            }

        }

        res.pageError = function (err) {
            console.error(err)
            res.render('error', {err})
        }

        next()
    }
}