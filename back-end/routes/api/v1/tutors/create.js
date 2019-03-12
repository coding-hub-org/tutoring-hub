var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.post('/create', function (req, res) {
    Tutor.create(req.body).then(
        (tutor) => {
            console.log("Inserted tutor data: " + tutor);
            res.send(tutor);
            console.log(tutor);
        }
    );
});

module.exports = router;