var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: hello from swagger summary
 *     description: hello from swagger description
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: truc
*/
router.get('/', function(req, res, next) {
  res.send('hello');
});

module.exports = router;
