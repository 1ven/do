'use strict';

const _ = require('lodash');
const Base = require('./Base');

const Card = _.assign({}, Base, {
    table: 'cards',
    immutableFields: ['id'],
});

module.exports = Card;
