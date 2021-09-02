const express = require('express')
const {ObjectId} = require('mongodb');
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({error: error.message})
    }

})

router.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.get('/users/me/personality', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user.personality_answers)
})

router.put('/users/me/personality', auth, async (req, res) => {
    // Update personality form answers

    let toSave = []

    for (const [id, answer] of Object.entries(req.body)) {
        toSave.push({
            "question_id": new ObjectId(id),
            "choice": answer
        })
    }

    try {
        req.user.personality_answers = toSave
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/users/me/personality', auth, async (req, res) => {
    // Calculate result
    try {
        res.send(await req.user.generatePersonality())
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
