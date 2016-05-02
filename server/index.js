'use strict';

const _ = require('lodash');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const makeConString = require('./utils/makeConString');
const passport = require('./lib/passport');
const config = require('./config');
const errorHandler = require('./middlewares/').errorHandler;
const initRoutes = require('./routes');

const app = express();
const sessionOpts = _.assign({}, config.session, {
    store: new pgSession({
        conString: makeConString(config.db)
    })
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));
initRoutes(app);
app.use(errorHandler);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));

module.exports = app;
