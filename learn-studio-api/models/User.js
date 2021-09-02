const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Question = require('../models/PersonalityForm/Question')
const {Type} = require('../models/PersonalityForm/Type')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true
    },
    firstname: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    created_at: {type: Date, default: Date.now},
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    personality_answers: [{
        question_id: {
            type: mongoose.ObjectId,
//            required: true,
//            unique: true
        },
        choice: {
            type: Number,
//            required: true
        },
    }],
    personality: {type: mongoose.Mixed}
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.generatePersonality = async function () {
    const user = this
    let types = (await Type.find().exec())

    let results = types.map(type => {
        return {
            "_id": type._id,
            "name": type.name,
            "result": 0
        };
    })

    for (let i = 0; i < user.personality_answers.length; i++) {
        let answer = user.personality_answers[i]
        let question = (await Question.findById(answer.question_id))

        if (!question || answer.choice === undefined)
            return;

        let objIndex = results.findIndex(obj => obj._id.toString() === question.type._id.toString());


        console.log("Before update: ", results[objIndex])
        results[objIndex].result++
        console.log("After update: ", results)

        user.personality = results

        user.save()
    }

    user.personality = results

    user.save()

    return user.personality
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User