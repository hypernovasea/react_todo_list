const dbConfig = require('./db/config_values');

module.exports = {
    development: {
        client: 'pg',
        version: '12.4',
        connection: {
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        }
    },
    production: {
        client: 'pg',
        version: '12.4',
        connection: {
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        }
    }
}