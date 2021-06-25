const mongoose = require('mongoose')
const {typeSchema} = require('../PersonalityForm/Type')

const questionSchema = mongoose.Schema({
    entitled: {
        type: String,
        required: true,
        trim: true
    },
    choices: {
        type: [Number],
        min: 0,
        max: 3
    },
    type: typeSchema
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question