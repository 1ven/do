'use strict';

const bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});
const config = require('../config');
const sql = require('../utils/sql');
const fs = require('fs');
const path = require('path');

const db = pgp(config.db);

db.tx(function() {
    return this.none(sql('comments.sql'))
        .then(() => this.none(sql('cards.sql')))
        .then(() => this.none(sql('lists.sql')))
        .then(() => this.none(sql('boards.sql')))
        .then(() => this.none(sql('users.sql')));
}).catch(err => { throw err; });

module.exports = db;
