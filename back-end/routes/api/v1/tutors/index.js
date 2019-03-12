const express = require('express');
const router = express.Router({
    mergeParams: true
});

const display = require('./display');
const update = require('./update');
const create = require('./create');
const remove = require('./remove');
const all = require('./all');

router.get('/:tutorID', display);
router.put('/:tutorID', update);
router.post('/create', create);
router.post('/remove/:tutorID', remove);
router.get('/', all);

module.exports = router;