const config = require('./config');
const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

module.exports = function (app) {
    app.get('/api/boards(|/:id)', handleRoute(BoardController, 'get'));
    app.post('/api/boards', handleRoute(BoardController, 'create'));
    app.post('/api/boards/:id/lists', handleRoute(BoardController, 'createList'));
    app.delete('/api/boards/:id', handleRoute(BoardController, 'remove'));
    app.put('/api/boards/:id', handleRoute(BoardController, 'update'));

    app.post('/api/lists/:id/cards', handleRoute(ListController, 'createCard'));
    app.delete('/api/lists/:id', handleRoute(ListController, 'remove'));
    app.put('/api/lists/:id', handleRoute(ListController, 'update'));

    app.delete('/api/cards/:id', handleRoute(CardController, 'remove'));
    app.put('/api/cards/:id', handleRoute(CardController, 'update'));

    app.get('*', function(req, res) {
        res.render('index', {
            bundle: config.bundle
        });
    })

    function handleRoute(Controller, action) {
        return Controller[action].bind(Controller);
    };
};
