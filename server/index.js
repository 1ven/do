'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const initRoutes = require('./init-routes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

initRoutes(app);

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));

module.exports = app;
