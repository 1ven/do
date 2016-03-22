'use strict';

const db = require('../db');
const _ = require('lodash');
const baseApi = require('../api/base-api');

const listsApi = _.assign({}, baseApi, {
    table: 'lists',
    addCard(listId, cardId) {},
    removeCard(listId, cardId) {}
});

module.exports = listsApi;
