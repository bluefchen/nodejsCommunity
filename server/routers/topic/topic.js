const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();

router.get('/topic/all', (req,res)=>{
    db.Topic.Model
        .find()
        .exec()
        .then( (result)=>{
            console.log(result.data)
            res.json({flag: 1, msg: '获取所有话题数据成功', result: result})
        } )
        .catch( (err)=>{
            console.log(err)
            res.json({flag: 0, msg: '获取所有话题数据失败'})
        } )
})


module.exports = router;