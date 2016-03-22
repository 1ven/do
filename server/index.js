'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const initRoutes = require('./init-routes');

const app = express();

app.use(bodyParser.json());

initRoutes(app);

app.listen(3000, () => console.log('Listening on 3000...'));

module.exports = app;
