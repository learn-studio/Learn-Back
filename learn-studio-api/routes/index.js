var express = require('express');
var router = express.Router();
const Question = require('../models/PersonalityForm/Question')
const {Type} = require('../models/PersonalityForm/Type')


router.get('/', async function (req, res, next) {
    const question = new Question({
        "entitled": "oKOKOK",
        "choices": [
            1, 2, 3
        ],
        "type": await Type.findById("60c77d024f4f3e0012a211a7")
    })
    await question.save()

    res.send('hello');
});

router.get('/health', async function (req, res, next) {
    res.send('Healthy');
});

module.exports = router;
