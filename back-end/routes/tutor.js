var express = require('express');
var router = express.Router();

router.get('/:id', (req, res, next) => {
    res.send("USER WITH ID " + req.params.id);
});

router.get('/:id/reviews', (req, res, next) => {
    res.send("USER WITH ID REVIEWS " + req.params.id);
});

router.get('/:id/rate', (req, res, next) => {
    res.send("SURVERY FOR TUTOR " + req.params.id);
});

router.post('/:id/rate', (req, res, next) => {
    res.send("SUBMIT SURVERY FOR TUTOR " + req.params.id);
});

module.exports = router;
