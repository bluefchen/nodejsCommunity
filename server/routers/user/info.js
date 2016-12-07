const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();


router.get('/u/:uid', (req, res)=>{
    var uid = req.params.uid;
    db.User.Model
        .find({_id: uid})
        .exec()
        .then((result)=>{
            if(result.length == 0){
                // TODO
                // 这里将来要跳转到404页面
                res.json({flag: 0, msg: '没有查询到该用户的信息'})
            }else if(result.length == 1){
                res.render('./u/userInfo', {flag: 1, msg: '用户信息查询成功', result: result})
            }else{
                res.json({flag: 0, msg: '查询该用户时发生异常'})
            }
        })
})


module.exports = router;
