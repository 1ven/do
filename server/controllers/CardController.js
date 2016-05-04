'use strict';

const _ = require('lodash');
const Card = require('../models/Card');
const BaseController = require('./BaseController');
const secureController = require('../utils/secureController');

const CardController = _.assign({}, BaseController, {
    Model: Card,
});

module.exports = secureController(CardController, ['getOne', 'remove', 'update']);
