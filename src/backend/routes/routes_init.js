
const apiRoutes = require('./apis/api');

function init(app) {
    app.get('/', (req, res) => {
        res.send({ media: 'This is the media route!' })
    });
    app.use('/api', apiRoutes);
}

module.exports = {
    init: init
};
