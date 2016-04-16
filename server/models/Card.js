'use strict';

const _ = require('lodash');
const Base = require('./Base');

const Card = _.assign({}, Base, {
    table: 'cards'
});

module.exports = Card;
