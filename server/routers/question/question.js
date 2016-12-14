const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();




router.get('/q/:qid', (req, res)=>{
    var qid = req.params.qid;
    db.Question.Model
        .find({_id: qid})
        .populate({
            path: 'owner answers topic',
            populate: { path: 'owner' }  //级联查询answers下的owner
        })
        .exec()
        .then((result)=>{
            if(result.length != 1) console.log('查询id为'+qid+'的问题时返回'+result.length+'条数据')
            res.render('./q/question', {flag: 1, msg: '问题内容查询成功', q: result[0]})
        })
        .catch( (err)=>{
            res.status(404).render('404');
        } )
})



router.get('/questions/:tid', (req, res)=>{
    var tid = req.params.tid;
    db.Question.Model
        .find({topic: tid})
        .populate({path: 'topic'})
        .then( (result)=>{
            res.json({flag: 1, msg: '通过话题获取问题信息成功', result: result})
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '通过话题获取问题信息成功'})
        } )
})



// 获取问题的总数
router.get('/question/count', (req, res)=>{
    db.Question.Model
        .count()
        .exec()
        .then( (result)=>{
            res.json({flag: 1, msg: '获取问题总数成功', result: result})
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '获取问题总数时出错'})
        } )
})



// 分页功能
// 通过updataTime排序
router.get('/question/portion/:pageIndex', (req, res)=>{
    var pageIndex = req.params.pageIndex;
    db.Question.Model
        .find()
        .sort({updateTime: -1})
        .skip((pageIndex-1)*10)
        .limit(10)
        .populate({
            path: 'topic',
        })
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



// 获取所有的问题
router.get('/question/all', (req, res)=>{
    db.Question.Model
        .find()
        .sort({updateTime: -1})
        .populate({
            path: 'topic',
        })
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



// 添加一条问题
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
            description: req.body.description,
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