const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();




router.get('/q/:qid', (req, res)=>{
    var qid = req.params.qid;
    db.Question.Model
        .find({_id: qid})
        .populate({
            path: 'owner answers topic',
            populate: {path: 'answers'}
        })
        .exec()
        .then((result)=>{
            if(result.length == 0){
                // TODO
                // 这里将来要跳转到404页面
                res.json({flag: 0, msg: '没有查询到该问题的内容'})
            }else if(result.length == 1){
                res.render('./q/question', {flag: 1, msg: '问题内容查询成功', result: result})
            }else{
                res.json({flag: 0, msg: '查询该问题的内容时发生异常'})
            }
        })
})







router.get('/question/all', (req, res)=>{
    db.Question.Model
        .find()
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 0, msg: '没有获取到问题数据'})
            }else{
                res.json({flag: 1, msg: '获取到'+result.length+'条问题数据', result: result})
            }
        } )
        .catch( (err)=>{
            console.log(err)
            res.json({flag: 0, msg: '检索问题数据时发生了异常'})
        } )
})



router.post('/question/add', (req, res)=>{
    db.Topic.Model
        .find({description: req.body.topic})
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 0, msg: '话题信息检索失败'})
            }else{
                saveQuestion(result[0]._id, req, res)
            }
        } )
        .catch( (err)=>{
            console.log(err)
            res.json({flag: 0, msg: '数据库异常2'})
        } )

    function saveQuestion(topic_id, req, res) {
        var question = new db.Question.Model({
            owner: req.cookies.signerID,
            title: req.body.title,
            designation: req.body.designation,
            topic: topic_id,
            answers: [],
            createTime: new Date(),
            updateTime: new Date()
        })
            .save()
            .then( ()=>{
                res.json({flag: 1, msg: '问题发布成功！'})
            })
            .catch( (err)=>{
                console.log(err);
                res.json({flag: 0, msg: '问题发布失败'});
            })
    }
})


module.exports = router;