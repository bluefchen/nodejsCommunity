const db = require('../db/mongodb.cfg');

let questionAPI = {}


questionAPI.getAll = function(req, res){
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
};


questionAPI.getOneById = function(req, res){
    let qid = req.params.qid;
    db.Question.Model
        .findById(qid)
        .populate({
            path: 'owner answers topic',
            // populate: { path: 'owner' }  //级联查询answers下的owner
        })
        .then((result)=>{
            db.Answer.Model
                .find({answerFor: qid})
                .populate({path: "owner"})
                .then((doc)=>{
                    // console.dir(doc);
                    result.answers = doc;
                    res.render('./q/question', {flag: 1, msg: '问题内容查询成功', q: result})
                })
        })
        .catch( (err)=>{
            res.status(404).render('404');
        } )
};


questionAPI.getTopic = function(req, res){
    let tid = req.params.tid;
    db.Question.Model
        .find({topic: tid})
        .sort({updateTime: -1})
        .populate({path: 'topic'})
        .then( (result)=>{
            res.json({flag: 1, msg: '通过话题获取问题信息成功', result: result})
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '通过话题获取问题信息成功'})
        } )
};


questionAPI.getCount = function(req, res){
    db.Question.Model
        .count()
        .exec()
        .then( (result)=>{
            res.json({flag: 1, msg: '获取问题总数成功', result: result})
        } )
        .catch( (err)=>{
            res.json({flag: 0, msg: '获取问题总数时出错'})
        } )
}


questionAPI.getByPageIndex = function(req, res){
    let pageIndex = req.params.pageIndex;
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
}


questionAPI.createOne = function(req, res){
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
        req.body.description = req.body.description.replace(/</g, '&lt;');
        req.body.description = req.body.description.replace(/>/g, '&gt;');
        let question = new db.Question.Model({
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
};

module.exports = questionAPI;