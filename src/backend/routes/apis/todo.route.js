const router = require('express').Router();
const todoController = require("../../controllers/todo.controller");

router.get('/', todoController.findAllTasks);
router.get('/:id', todoController.findTask);
router.post('/', todoController.createTask);
router.put('/:id', todoController.changeTask); 
router.delete('/:id', todoController.deleteTask); 

module.exports = router;

// const express = require('express');
// const todoController = require("../../controllers/todo.controller");

// module.exports = () => {
//     const router = express.Router();

//     router.get('/', todoController.findAllTasks);
//     router.get('/:id', todoController.findTask);
//     router.post('/', todoController.createTask);
//     router.put('/:id', todoController.changeTask); 
//     router.delete('/:id', todoController.deleteTask); 

//     // app.use('/todos', router);
// };
