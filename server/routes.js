const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

module.exports = function (app) {
    get('/boards(|/:id)', BoardController, 'get');
    post('/boards', BoardController, 'create');
    post('/boards/:id/lists', BoardController, 'createList');
    del('/boards/:id', BoardController, 'remove');

    post('/lists/:id/cards', ListController, 'createCard');
    del('/lists/:id', ListController, 'remove');

    del('/cards/:id', CardController, 'remove');

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

    function update(path, Controller, action) {
        return makeRoute('update', path, Controller, action);
    };

    function del(path, Controller, action) {
        return makeRoute('delete', path, Controller, action);
    };
};
