var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send({ message: 'nice students and shit' });
});

module.exports = router;