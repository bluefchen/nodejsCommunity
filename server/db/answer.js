const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Answer = {}

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        maxlength: [10240, '问题描述不能超过1000个字符']
    },
    answerFor: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
    },
    agressers: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    createTime: Date,
    updateTime: Date,
})


Answer.Model = mongoose.model('answers', answerSchema)

Answer.Model.on('index', (err)=>{
    if(err){
        console.error('集合 answers 索引错误！')
    }else{
        console.log('集合 answers 索引成功！')
    }
})

module.exports = Answer