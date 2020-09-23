const express = require('express');

// Express middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors'); // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

// Database connection via localhost
const dbConfig = require('../db/config_values');
let db = require('knex')({
    client: 'pg',
    version: '12.4',
    connection: {
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    }
});

// Controller
const todo_controller = require('../controllers/todo.controller');

// App
const app = express();

// App middleware
const whitelist = ['http://localhost:8081']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json()); //parse requests of content-type -- application/json
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan('combined'))


// App routes
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
app.get("/todos", (req, res) => {
    todo_controller.findAll(req, res, db);
});

app.get("/todo/:id", (req, res) => {
    todo_controller.findOne(req, res, db);
});

// App server connection
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
