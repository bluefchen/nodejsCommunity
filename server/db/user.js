const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = {}

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: [true, '用户名不能为空'],
        match: [/^[\u4e00-\u9fa5\w]{2,10}$/, '只支持汉字，字母，数字，下划线'],
        minlength: [2, '不能少于两个字符'],
        maxlength: [10, '不能大于10个字符']
    },
    password: {
        type: String,
        required: [true, '密码不能为空！'],
        minlength: [6, '密码至少为6位'],
        maxlength: [16, '密码最多为16位']
    },
    email: {
        type: String,
        required: [true, '邮箱地址不能为空'],
        match: [/^([\w\.-]+)@([\w\.-]+)\.([a-zA-Z\.])$/, '邮箱格式不正确']
    },
    gender: {
        type: Number,
        match: [/[012]/, '数据格式不正确']
    },
    createTime: Date,
    createIp: String,
    avatar: String,
    description: {
        type: String,
        maxlength: [150, '长度不能超过150个字符']
    },
    address: String,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    blighters: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    myQuestions: [{
        type: Schema.Types.ObjectId,
        ref: 'questions'
    }],
    myAnswers: [{
        type: Schema.Types.ObjectId,
        ref: 'answers'
    }],
    myLetters: [{
        type: Schema.Types.ObjectId,
        ref: 'letters'
    }]
})

User.Model = mongoose.model('users', userSchema)

User.Model.on('index', (err)=>{
    if(err){
        console.error('集合 users 索引错误！')
    }else{
        console.log('集合 users 索引成功！')
    }
})

module.exports = User