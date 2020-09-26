
const apiRoutes = require('./apis');

function init(app) {
    app.get('/', (req, res) => {
        res.send({ media: 'This is the media route!' })
    });
    app.use('/api', apiRoutes);
}

module.exports = {
    init: init
};


// module.exports = (app) => {
//     const router = require('express').Router();

//     router.get('/', (req, res) => {
//         res.send({ media: 'This is the media route!' });
        
//     });

//     app.use('/v1', router);
// };