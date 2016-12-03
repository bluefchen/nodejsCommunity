const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Topic = {}

const topicSchema = new Schema({
    designation: String
})

Topic.Model = mongoose.model('topics', questionSchema)

Topic.Model.on('index', (err)=>{
    if(err){
        console.error('集合 topics 索引错误！')
    }else{
        console.log('集合 topics 索引成功！')
    }
})

module.exports = Topic