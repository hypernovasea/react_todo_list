const knex = require('../db/knex');

const todoController = {
    
    createTask(req, res) {
        console.log("req: " + req.body.task);
        console.log("req: " + req.body.isdone);

        knex('todo')
            .insert({ 
                task: req.body.task,
                is_done: req.body.isdone 
            })
            .then(() => {
                res.json({success: true, message: 'Task has been created!'})
            })
            .catch((err) => {
                console.log("error: " + err);
                res.status(400).json({dbError: 'db error'})
            });
    },

    findAllTasks(req, res) { 
        knex.select('*').from('todo')
            .then(items => {
                if(items.length){
                    res.json(items)
                } else {
                    res.json({dataExists: 'false'})
                }
            })
            .catch(err => res.status(400).json({dbError: 'db error'}))
    },


    findTask(req, res) {
        knex('todo')
            .where({id: req.params.id})
            .then(item => {
                res.json(item)
            })
            .catch(err => res.status(400).json({dbError: 'db error'}))
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
                res.json({'message': 'Task updated!'})
            })
            .catch(err => res.status(400).json({dbError: 'db error'}))
    },


    deleteTask(req, res) {
        knex('todo')
            .where('id', '=', req.params.id)
            .del()
            .then( () => {
                res.json({'message': 'Task has been deleted!'})
            })
            .catch(err => res.status(400).json({dbError: 'db error'}))
    }

};

module.exports = todoController;