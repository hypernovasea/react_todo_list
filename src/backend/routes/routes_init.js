
const apiRoutes = require('./apis/api');

// initialize route starting point
function init(app) {
    app.get('/', (req, res) => {
        res.send({ media: 'This is the api route!' })
    });

    // create the starting point of routes
    app.use('/api', apiRoutes);
}

module.exports = {
    init: init
};
