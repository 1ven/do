'use strict';

const _ = require('lodash');
const Card = require('../models/Card');
const BaseController = require('./BaseController');

const CardController = _.assign({}, BaseController, {
    Model: Card,
});

module.exports = CardController;
