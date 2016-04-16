'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const errorHandler = require('./middlewares').errorHandler;
const initRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
initRoutes(app);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));

module.exports = app;
