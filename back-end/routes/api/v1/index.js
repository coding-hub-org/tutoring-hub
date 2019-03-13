var express = require('express');
var router = express.Router();

router.use('/tutors', require('./tutors'));
router.use('/cloudinary', require('./cloudinary'));

router.use('/auth', require('./auth'));

router.get('/', function (req, res, next) {
    res.send("This is the main API v1 page.");
});

module.exports = router;