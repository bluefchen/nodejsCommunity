const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = {}

const questionSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: [true, '问题名不能为空'],
        maxlength: [20, '问题名不能超过20个字符']
    },
    description: {
        type: String,
        maxlength: [1024, '问题描述不能超过1000个字符']
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'answers'
    }],
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topics'
    },
    createTime: Date,
    updateTime: Date,
})

Question.Model = mongoose.model('questions', questionSchema)

Question.Model.on('index', (err)=>{
    if(err){
        console.error('集合 questions 索引错误！')
    }else{
        console.log('集合 questions 索引成功！')
    }
})

module.exports = Question