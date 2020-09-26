const express = require('express');

// Express middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors'); // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

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
app.use(bodyParser.json()); //parse application/json requests 
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(morgan('combined'))


// App routes
app.get('/', (req, res) => {
    res.send({ message: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
let routes = require('./routes/routes_init');
routes.init(app);


// App server connection
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
