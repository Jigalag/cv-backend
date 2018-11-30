const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/about', (req, res) => {
        const details = { '_id': new ObjectID('5c013092fb6fc038cbafe6fb')};
        db.collection('about').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.setHeader('Cache-control', 'no-cache');
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.send(item);
            }
        });
    });
};