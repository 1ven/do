'use strict';

const bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});
const config = require('../config');
const sql = require('../utils/sql');

const db = pgp(config.db);

db.none(sql('cards.sql'))
    .then(() => db.none(sql('lists.sql')))
    .then(() => db.none(sql('boards.sql')))
    .then(() => db.none(sql('users.sql')))
    .catch(err => { throw err; });

module.exports = db;
