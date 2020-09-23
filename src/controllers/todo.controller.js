
exports.findAll = (req, res, db) => {
    db.select('*').from('todo')
    .then(items => {
        if(items.length){
            res.json(items)
        } else {
            res.json({dataExists: 'false'})
        }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
};


exports.findOne = (req, res, db) => {
    db('todo').where({id: req.params.id})
    .then(item => {
        res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
};