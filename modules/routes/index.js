var express = require('express');
var router = express.Router();
var path = require( 'path' );
var bodyParser = require('body-parser');
var user = require('../user');


router.use(bodyParser.urlencoded({
  extend: true
}));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
