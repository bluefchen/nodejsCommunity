const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();

const encrypt = require('../../extensions/encrypt')


router.post('/user/login', (req, res)=>{
    req.body.password = encrypt.useMD5(req.body.password)
    console.log(req.body)
    db.User.Model
        .find({username: req.body.username})
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 0, msg: '用户名不存在'})
            }else if(result[0].password == req.body.password){
                res.cookie('signerID', result[0]._id);
                res.cookie('signerAva', result[0].avatar);
                res.json({flag: 1, msg: '登录成功'})
            }else{
                res.json({flag: 0, msg: '密码错误'})
            }
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '服务器验证出错'})
        } )
})


module.exports = router;