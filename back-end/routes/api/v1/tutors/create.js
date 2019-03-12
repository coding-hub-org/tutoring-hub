var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.post('/add', function (req, res, next) {
    // Tutor.create(req.body).then(
    //     (tutor) => {
    //         //TODO check success/failure
    //         res.send(tutor);
    //     }
    // );
    res.send("This is the add page");
});

module.exports = router;