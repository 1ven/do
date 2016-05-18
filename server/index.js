'use strict';

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('./lib/passport');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/').errorHandler;

const app = express();

// if (process.env.NODE_ENV === 'development') {
//     const webpack = require('webpack');
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');
//     const webpackConfig = require('../webpack.config');

//     const compiler = webpack(webpackConfig);

//     app.use(webpackDevMiddleware(compiler, {
//         publicPath: webpackConfig.output.publicPath,
//         noInfo: true
//     }));
//     app.use(webpackHotMiddleware(compiler));
// }

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(routes);
app.use(errorHandler);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
