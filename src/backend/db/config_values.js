module.exports = {
    HOST: "localhost",
    USER: "todouser",
    PASSWORD: "todolistpassword",
    DB: "testdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};