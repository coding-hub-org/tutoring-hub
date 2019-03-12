var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.get('/', (req, res, next) => {
    Tutor.find({}, function (err, tutors) {
        if (err) {
            res.json({
                error: err
            });
            return;
        }
        res.send(tutors);
    });
});


module.exports = router;