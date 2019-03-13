var express = require('express');
var router = express.Router();


router.use('/api/v1', require('./api/v1'));
// router.use('/api/v2', require('./api/v2'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is the homepage of the server");
});

router.post('/', function (req, res, next) {
  res.json(req.body);
});


module.exports = router;