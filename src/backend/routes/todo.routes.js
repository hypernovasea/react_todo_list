const express = require('express');
const todoController = require("../controllers/todo.controller");

module.exports = (app) => {

    const router = express.Router();

    // router.post("/", todoController.create);
    router.get('/', todoController.findAll);
    router.get('/:id', todoController.findOne);
    // router.put("/:id", todoController.update);  // Update a Todo with id
    // router.delete("/:id", todoController.delete); // Delete a Todo with id

    // Create a new Todo
    // router.post("/", todos.create);

    // Retrieve all todos
    // router.get("/", todos.findAll);
    // router.get("/", todos.findAll(req, res, db));

    // Retrieve a single Todo with id
    // router.get("/:id", todos.findOne);

    // Update a Todo with id
    // router.put("/:id", todos.update);

    // Delete a Todo with id
    // router.delete("/:id", todos.delete);

    // Create a new Todo
    // router.delete("/", todos.deleteAll);

    // app.use('/api/todos', router);

    app.use('/todos', router);
};




// ONE WAY

// const router = require('express').Router();
// const todoController = require("../controllers/todo.controller");

// router.post("/", todoController.create);
// router.get('/', todoController.findAll);
// router.get('/:id', todoController.findOne);
// router.put("/:id", todoController.update);  // Update a Todo with id
// router.delete("/:id", todoController.delete); // Delete a Todo with id

// module.exports = router;