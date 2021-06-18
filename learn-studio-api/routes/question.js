const express = require('express')
const Question = require('../models/PersonalityForm/Question')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/questions', async (req, res) => {
    // Create a new user
    try {
        res.status(200).send(await Question.find({}))
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router