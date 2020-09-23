// const express = require('express');
// const todos = require("../controllers/todo.controller");

// module.exports = (app, db) => {
//     // const todos = require("../controllers/todo.controller");

//     const router = express.Router();

//     // Create a new Todo
//     // router.post("/", todos.create);

//     // Retrieve all todos
//     // router.get("/", todos.findAll);
//     // router.get("/", todos.findAll(req, res, db));

//     // Retrieve a single Todo with id
//     // router.get("/:id", todos.findOne);

//     // Update a Todo with id
//     // router.put("/:id", todos.update);

//     // Delete a Todo with id
//     // router.delete("/:id", todos.delete);

//     // Create a new Todo
//     // router.delete("/", todos.deleteAll);

//     // app.use('/api/todos', router);

//     app.use('/todos', router);
// };

const router = require('express').Router();

// Controllers
const {
    getAllTodos
} = require("../controllers/todo.controller");

router.route('/todos')
    .get(getAllTodos);

module.exports = router;