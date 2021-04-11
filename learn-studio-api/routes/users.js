var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
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
  res.send('respond with a resource');
});

module.exports = router;
