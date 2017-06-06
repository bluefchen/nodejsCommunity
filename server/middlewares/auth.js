
exports.isLogin = function(req, res, next){
    if(req.session.user){
        next();
    } else {
        return res.json({flag: 0, msg: "您没有该接口的访问权限"});
    }
}