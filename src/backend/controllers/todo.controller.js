const knex = require('../db/knex');

const todoController = {
    
    findAll(req, res) { 
        // returns all todos
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

    findOne(req, res) {
        knex('todo').where({id: req.params.id})
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
    }
};

module.exports = todoController;