const about = require('./about');
module.exports = function(app, db) {
    const database = db.db('cv-jigalag');
    about(app, database);
    // Тут, позже, будут и другие обработчики маршрутов
};