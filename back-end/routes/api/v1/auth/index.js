const express = require('express');
const router = express.Router({
    mergeParams: true
});

router.get('/', function (req, res, next) {
    res.send("This is where we check if the user is authenticated");
});

router.post('/', function (req, res, next) {
    res.json(req.body);
});



router.post('/google', function (req, res, next) {
    
});


module.exports = router;