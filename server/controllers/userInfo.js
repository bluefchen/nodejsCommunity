const db = require("../db/mongodb.cfg");
const uploads = require('../multer.cfg').uploads;
const fs = require('fs');
const upload = uploads.single('newAvatar');

let userInfoAPI = {}

userInfoAPI.goUserInfoPage = function(req, res){
    let uid = req.params.uid;
    db.User.Model
        .findById(uid)
        .exec()
        .then((result)=>{
            res.render('./u/userInfo', {flag: 1, msg: '用户信息查询成功', result: result});
        })
        .catch( (err)=>{
            res.status(404).render('404');
        })
};

userInfoAPI.updateAvatar = function(req, res){
    upload(req, res, (err)=>{
        if(err){
            console.log(err)
            res.json({flag: 0, msg: '头像上传失败1', error: err})
        }else{
            let uid = req.cookies.signerID;
            let newAvatarName = req.file.filename;
            // 查找该用户
            db.User.Model
                .find({_id: uid})
                .exec()
                .then((result)=>{
                    if(result[0].avatar == 'default.jpg'){  // 如果用户当前是默认头像
                        updateAvatar(uid, newAvatarName, res)
                    }else{  // 该用户当前不是默认头像
                        let oldAvatarName = result[0].avatar;
                        // 先删除原来的
                        // 路径是相对于server.js的
                        fs.unlink('www/images/avatar/'+oldAvatarName, (err)=>{
                            if(err){
                                res.json({flag: 0, msg: '头像上传失败4', error: err})
                            }else{
                                updateAvatar(uid, newAvatarName, res)
                            }
                        })
                    }
                })
                .catch((err)=>{
                    res.json({flag: 0, msg: '头像上传失败2', error: err})
                })
        }
    });


    function updateAvatar(uid, newAvatarName, res) {
        db.User.Model
            .update({_id: uid}, {$set: {avatar: newAvatarName}})
            .then(()=>{
                res.cookie('signerAva', newAvatarName);
                res.json({flag: 1, msg: '头像上传成功！'});
            })
            .catch((err)=>{
                res.json({flag: 0, msg: '头像上传失败3', error: err})
            })
    }
}

module.exports = userInfoAPI;