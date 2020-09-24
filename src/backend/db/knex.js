const environment = process.env.NODE_ENV || 'development';
const knexfileConfig = require('../knexfile')
const enviromentConfig = knexfileConfig[environment];

const knex = require('knex');
const connection = knex(enviromentConfig);

module.exports = connection;