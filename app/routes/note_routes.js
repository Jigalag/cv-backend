module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // Здесь будем создавать заметку.
        res.send('Hello')
    });
};