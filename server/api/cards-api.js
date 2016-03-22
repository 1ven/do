'use strict';

const _ = require('lodash');
const baseApi = require('../api/base-api');

const cardsApi = _.assign({}, baseApi, {
    table: 'cards'
});

module.exports = cardsApi;
