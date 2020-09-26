const router = require('express').Router()

router.get('/', (req, res) => {
    res.send({ express: 'This is the book route!' });
});
router.use('/books', router);

module.exports = router;

// module.exports = (app) => {
//     const router = require('express').Router();

//     router.get('/', (req, res) => {
//         res.send({ express: 'This is the book route!' });
//     });

//     app.use('/books', router);
// }; 