const db = require('../db/mongodb.cfg');
const encrypt = require('../utils/encrypt');

let userAPI = {}


userAPI.login = function(req, res){
    req.body.password = encrypt.useMD5(req.body.password);
    db.User.Model
        .find({username: req.body.username})
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 0, msg: '用户名不存在'});
            }else if(result[0].password == req.body.password){
                res.cookie('signerID', result[0]._id);
                res.cookie('signerAva', result[0].avatar);
                res.json({flag: 1, msg: '登录成功'});
            }else{
                res.json({flag: 0, msg: '密码错误'});
            }
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '服务器验证出错'});
        } )
}


userAPI.checkName = function(req, res){
    db.User.Model
        .find({username: req.body.username})
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 1, msg: '用户名可以使用'})
            }else{
                res.json({flag: 0, msg: '用户名已存在'})
            }
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '查询失败'})
        } )
}


userAPI.register = function(req, res){
    let user = new db.User.Model({
        username: req.body.username,
        password: encrypt.useMD5(req.body.passwd),
        email: req.body.email,
        gender: req.body.gender,
        createTime: new Date(),
        birthday: new Date(),
        createIp: req.ip,
        avatar: 'default.jpg'
    })
        .save()
        .then( ()=>{
            res.json({flag: 1, msg: '注册成功！'})
        })
        .catch( (err)=>{
            console.log(err);
            res.json({flag: 0, msg: '注册失败'});
        })
}


module.exports = userAPI;