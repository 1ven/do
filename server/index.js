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

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'static')));
initRoutes(app);
app.use(errorHandler);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
