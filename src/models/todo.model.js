const createGuts = require('../db_helpers/model-guts');

const modelName = 'Todo'
const tableName = 'todo'
const selectProperties = [
    'id',
    'task',
    'is_done'
]

module.exports = knex => {

    const guts = createGuts({
        knex,
        modelName,
        tableName,
        selectProperties
    })

    return {
        ...guts
    }
};