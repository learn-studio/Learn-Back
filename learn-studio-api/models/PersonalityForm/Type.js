const mongoose = require('mongoose')

const typeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String
    }
})

const Type = mongoose.model('Type', typeSchema)

module.exports = {Type, typeSchema}