const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();

const encrypt = require('../../extensions/encrypt')


router.post('/user/checkName', (req, res)=>{
    console.log(req.body)
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
})

router.post('/user/register', (req, res)=>{
    console.log(req.body)
    var user = new db.User.Model({
        username: req.body.username,
        password: encrypt.useMD5(req.body.passwd),
        email: req.body.email,
        gender: req.body.gender,
        createTime: new Date(),
        birthday: new Date(),
        createIp: req.ip,
        avatar: 'images/avatar/default.jpg'
    })
        .save()
        .then( ()=>{
            res.json({flag: 1, msg: '注册成功！'})
        })
        .catch( (err)=>{
            console.log(err);
            res.json({flag: 0, msg: '注册失败'});
        })
})



module.exports = router;