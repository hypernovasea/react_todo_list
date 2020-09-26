const express = require('express');
const todoRoutes = require('./todo.route');
const bookRoutes = require('./books/book.route')

const router = express.Router();
router.get('/', (req, res) => {
    res.send({ message: 'This is the api route!' });
})

// create branched off routes
router.use('/todos', todoRoutes);
router.use('/books', bookRoutes);

module.exports = router;