// This route point has no controller

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send({ express: 'This is the book route!' });
});

module.exports = router;
