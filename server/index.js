'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const initRoutes = require('./init-routes');

const app = express();

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

initRoutes(app);

app.listen(3000, () => console.log('Listening on 3000...'));

module.exports = app;
