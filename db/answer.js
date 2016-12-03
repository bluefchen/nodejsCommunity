const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Answer = {}

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: String,
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