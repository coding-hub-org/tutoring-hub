var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.post('/create', function (req, res) {
    Tutor.create(req.body).then(
        (tutor) => {
            res.send(tutor);
        }
    );
});

module.exports = router;