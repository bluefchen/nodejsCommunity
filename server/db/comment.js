const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = {}

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: String,
    createTime: Date,
    commentFor: {
        type: Schema.Types.ObjectId,
        ref: 'answers'
    }
})

Comment.Model = mongoose.model('comments', commentSchema)

Comment.Model.on('index', (err)=>{
    if(err){
        console.error('集合 comments 索引错误！')
    }else{
        console.log('集合 comments 索引成功！')
    }
})

module.exports = Comment