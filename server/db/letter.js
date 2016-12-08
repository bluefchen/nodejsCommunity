const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Letter = {}

const letterSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: String,
    createTime: Date,
    letterFor: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

Letter.Model = mongoose.model('letters', letterSchema)

Letter.Model.on('index', (err)=>{
    if(err){
        console.error('集合 letters 索引错误！')
    }else{
        console.log('集合 letters 索引成功！')
    }
})

module.exports = Letter