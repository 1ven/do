'use strict';

const path = require('path');
const express = require('express');
const config = require('./config');

const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/').errorHandler;
const initRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
initRoutes(app);
app.use(errorHandler);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));

module.exports = app;
