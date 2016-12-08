const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();


router.post('/answer/add', (req, res)=>{
    var answer = new db.Answer.Model({
        owner: req.body.uid,
        description: req.body.desc,
        answerFor: req.body.qid,
        createTime: new Date(),
        updateTime: new Date()
    })
        .save()
        .then( (result)=>{
            saveToQuestion(req.body.qid, result._id, req, res)
        } )
        .catch( (err)=>{
            console.log(err);
            res.json({flag: 0, msg: '回答发布失败'});
        })

    function saveToQuestion(qid, aid, req, res) {
        db.Question.Model
            .find({_id: qid})
            .exec()
            .then( (result)=>{
                if(result.length == 0){
                    res.json({flag: 0, msg: '将要回答的这个问题不存在'})
                }else{
                    var arr_ans = result[0].answers;
                    arr_ans.push(aid);
                    updateQuestion(qid, arr_ans, req, res);
                }
            } )
            .catch( (err)=>{
                console.log(err);
                res.json({flag: 0, msg: '查询回答的这个问题时发生异常'});
            } )
    }
    function updateQuestion(qid, arr, req, res) {
        db.Question.Model
            .update({_id: qid}, {$set: {answers: arr}})
            .then( ()=>{
                res.json({flag: 1, msg: '回答发布成功！'})
            } )
            .catch( (err)=>{
                res.json({flag: 0, msg: '保存回答到该问题时发生异常'})
            } )
    }
})


module.exports = router;