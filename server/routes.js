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
    app.post('/sign-up', ensureLoggedOut, handleRoute(UserController, 'register'));

    app.get('/logout', ensureLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/sign-in');
    });

    app.post('/auth/local', ensureLoggedOut, passport.authenticate('local', {
        failureRedirect: '/sign-in',
        successRedirect: '/'
    }));

    app.get('/api/boards', ensureLoggedIn, handleRoute(BoardController, 'get'));
    app.get('/api/boards/:id', ensureLoggedIn, handleRoute(BoardController, 'getOne'));
    app.post('/api/boards', ensureLoggedIn, handleRoute(BoardController, 'create'));
    app.post('/api/boards/:id/lists', ensureLoggedIn, handleRoute(BoardController, 'createList'));
    app.delete('/api/boards/:id', ensureLoggedIn, handleRoute(BoardController, 'remove'));
    app.put('/api/boards/:id', ensureLoggedIn, handleRoute(BoardController, 'update'));

    app.post('/api/lists/:id/cards', ensureLoggedIn, handleRoute(ListController, 'createCard'));
    app.delete('/api/lists/:id', ensureLoggedIn, handleRoute(ListController, 'remove'));
    app.put('/api/lists/:id', ensureLoggedIn, handleRoute(ListController, 'update'));

    app.delete('/api/cards/:id', ensureLoggedIn, handleRoute(CardController, 'remove'));
    app.put('/api/cards/:id', ensureLoggedIn, handleRoute(CardController, 'update'));

    app.get('*', ensureLoggedIn, (req, res) => {
        res.render('index', {
            bundle: config.bundle
        });
    });
};

function handleRoute(Controller, action) {
    return Controller[action].bind(Controller);
};
