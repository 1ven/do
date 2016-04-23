const config = require('./config');
const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

module.exports = function (app) {
    get('/api/boards(|/:id)', BoardController, 'get');
    post('/api/boards', BoardController, 'create');
    post('/api/boards/:id/lists', BoardController, 'createList');
    del('/api/boards/:id', BoardController, 'remove');
    put('/api/boards/:id', BoardController, 'update');

    post('/api/lists/:id/cards', ListController, 'createCard');
    del('/api/lists/:id', ListController, 'remove');
    put('/api/lists/:id', ListController, 'update');

    del('/api/cards/:id', CardController, 'remove');
    put('/api/cards/:id', CardController, 'update');

    app.get('*', function(req, res) {
        res.render('index', {
            bundle: config.bundle
        });
    })

    function makeRoute(method, path, Controller, action) {
        const callback = typeof action === 'undefined' ?
            Controller : Controller[action].bind(Controller);

        return app[method](path, callback);
    };

    function get(path, Controller, action) {
        return makeRoute('get', path, Controller, action);
    };

    function post(path, Controller, action) {
        return makeRoute('post', path, Controller, action);
    };

    function put(path, Controller, action) {
        return makeRoute('put', path, Controller, action);
    };

    function del(path, Controller, action) {
        return makeRoute('delete', path, Controller, action);
    };
};
