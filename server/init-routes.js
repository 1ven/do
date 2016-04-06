const boardsRoutes = require('./routes/boards-routes');
const listsRoutes = require('./routes/lists-routes');
const cardsRoutes = require('./routes/cards-routes');
const checkRequiredParams = require('./helpers').checkRequiredParams;
const config = require('./config');

module.exports = function(app) {
    const post = function(url, handler, requiredParams) {
        app.post(url, (req, res) => {
            const body = req.body;

            checkRequiredParams(body, requiredParams)
                .then(() => handler(body))
                .then(data => res.status(200).json({
                    success: true,
                    data: data
                }))
                .catch(err => res.json({
                    success: false,
                    error: err.message || err
                }));
        });
    };

    boardsRoutes(post);
    listsRoutes(post);
    cardsRoutes(post);

    app.get('*', function(req, res) {
        res.render('index', {
            bundle: config.bundle
        });
    });
};
