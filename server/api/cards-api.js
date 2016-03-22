'use strict';

const _ = require('lodash');
const db = require('../db');
const baseApi = require('../api/base-api');

const cardsApi = _.assign({}, baseApi, {
    table: 'cards',
    getSome(ids) {
        const template = _.map(ids, (id, index) => `$${index + 1}`).join(',');
        return db.query(`SELECT * FROM cards WHERE id IN (${template})`, ids);
    }
});

module.exports = cardsApi;
