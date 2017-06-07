const db = require('../db/mongodb.cfg');

let topicAPI = {}

topicAPI.getAll = function(req, res){
    db.Topic.Model
        .find()
        .exec()
        .then((result)=>{
            res.json({flag: 1, msg: '获取所有话题数据成功', result: result});
        })
        .catch((err)=>{
            res.json({flag: 0, msg: '获取所有话题数据失败'});
        });
};


topicAPI.createOne = function(req, res){
    if(!req.body.desc){
        res.status(400).json({flag: 0, msg: "请提供话题的信息"});
        return;
    }
    let description = new db.Topic.Model({
        description: req.body.desc + ""
    })
    description.save()
        .then(function(result){
            res.json({flag: 1, msg: "添加一个话题成功"});
        })
        .catch(function(err){
            res.json({flag: 0, msg: "请求的参数不合法", err: err});
        });
};


module.exports = topicAPI;