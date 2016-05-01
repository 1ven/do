const config = require('./config');
const passport = require('./lib/passport');
const BoardController = require('./controllers/BoardController');
const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const ensureLoggedIn = AuthController.ensureLoggedIn;
const ensureLoggedOut = AuthController.ensureLoggedOut;

module.exports = function (app) {
    app.get('/sign-in', ensureLoggedOut, (req, res) => {
        res.render('sign-in');
    });

    app.get('/sign-up', ensureLoggedOut, (req, res) => {
        res.render('sign-up');
    });

    app.post('/sign-up', ensureLoggedOut, handleRoute(UserController, 'register'));

    app.get('/logout', ensureLoggedOut, (req, res) => {
        req.logout();
        res.redirect('/sign-in');
    });

    app.post('/auth/local', passport.authenticate('local', {
        failureRedirect: '/sign-in',
        successRedirect: '/'
    }));

    app.get('/api/boards', handleRoute(BoardController, 'get'));
    app.get('/api/boards/:id', handleRoute(BoardController, 'getOne'));
    app.post('/api/boards', handleRoute(BoardController, 'create'));
    app.post('/api/boards/:id/lists', handleRoute(BoardController, 'createList'));
    app.delete('/api/boards/:id', handleRoute(BoardController, 'remove'));
    app.put('/api/boards/:id', handleRoute(BoardController, 'update'));

    app.post('/api/lists/:id/cards', handleRoute(ListController, 'createCard'));
    app.delete('/api/lists/:id', handleRoute(ListController, 'remove'));
    app.put('/api/lists/:id', handleRoute(ListController, 'update'));

    app.delete('/api/cards/:id', handleRoute(CardController, 'remove'));
    app.put('/api/cards/:id', handleRoute(CardController, 'update'));

    app.get('*', ensureLoggedIn, (req, res) => {
        res.render('index', {
            bundle: config.bundle
        });
    });
};

function handleRoute(Controller, action) {
    return Controller[action].bind(Controller);
};
