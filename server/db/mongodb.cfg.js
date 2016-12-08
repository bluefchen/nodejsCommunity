const mongoose = require('mongoose')

mongoose.Promise = Promise

// ---------------- 数据库连接 ----------------
mongoose.connect('mongodb://localhost:27017/nodeShequ')

const db = mongoose.connection
db.on('open', function(){
	console.log('数据库连接成功')
})
db.on('error', function(){
	console.log('数据库连接失败')
})


// ---------------- 导出数据模型 ----------------
exports.User = require('./user')
exports.Question = require('./question')
exports.Topic = require('./topic')
exports.Answer = require('./answer')
exports.Comment = require('./comment')
exports.Letter = require('./letter')


// const User = require('./user')
// const Question = require('./question')
// const Topic = require('./topic')
// const Answer = require('./answer')
// const Comment = require('./comment')
// const Letter = require('./letter')
// module.exports = {User, Question, Topic, Answer, Comment, Letter}


// ----------------  ----------------