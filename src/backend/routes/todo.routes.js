const express = require('express');
const todoController = require("../controllers/todo.controller");

module.exports = (app) => {
    const router = express.Router();

    router.get('/', todoController.findAllTasks);
    router.get('/:id', todoController.findTask);
    router.post('/', todoController.createTask);
    router.put('/:id', todoController.changeTask); 
    router.delete('/:id', todoController.deleteTask); 

    app.use('/todos', router);
};
