const knex = require('../db/knex');

const todoController = {
    
    createTask(req, res) {
        knex('todo')
            .insert({ 
                task: req.body.task,
                is_done: req.body.is_done 
            })
            .returning('id')
            .then((taskId) => {
                res.json({
                    success: true, 
                    taskId: taskId,
                    message: 'Task has been created!'
                })
            })
            .catch((err) => {
                console.log("error: " + err);
                res.status(400).json({
                    success: false, 
                    dbError: 'db error'
                })
            });
    },


    findAllTasks(req, res) { 
        knex.select('*').from('todo')
            .then(items => {
                if(items.length){
                    res.json({
                        dataExists: true,
                        tasks: items
                    })
                } else {
                    res.json({
                        dataExists: false
                    })
                }
            })
            .catch(err => res.status(400).json({
                success: false, 
                dbError: 'db error: unable to find tasks'
            }))
    },


    findTask(req, res) {
        knex('todo')
            .where({id: req.params.id})
            .then(item => {
                res.json({
                    success: true,
                    task: item
                })
            })
            .catch(err => res.status(400).json({
                success: false, 
                dbError: 'db error: unable to find task'
            }))
    },


    changeTask(req, res) {
        let taskId = req.params.id; 
        let task = req.body.task;
        let isDone = req.body.is_done;
        
        knex('todo')
            .where('id', '=', taskId)
            .update({ 
                task: task,
                is_done: isDone 
            })
            .then( () => {
                res.json({
                    success: true,
                    message: 'Task updated!'
                })
            })
            .catch(err => res.status(400).json({
                success: false, 
                dbError: 'db error: unable to update task'
            }))
    },


    deleteTask(req, res) {
        knex('todo')
            .where('id', '=', req.params.id)
            .del()
            .then( () => {
                res.json({
                    success: true, 
                    message: 'Task has been deleted!'
                })
            })
            .catch(err => res.status(400).json({
                success: false, 
                dbError: 'db error: unable to delete task'
            }))
    }

};

module.exports = todoController;