'use strict';

const config = require('../config');
const sql = require('../helpers').sql;
const bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});
const db = pgp(config.db);

db.tx(function() {
    return this.batch([
        this.none(sql('boards.sql')),
        this.none(sql('lists.sql')),
        this.none(sql('cards.sql'))
    ]);
});

module.exports = db;
