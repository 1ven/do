'use strict';

const config = require('../config');
const sql = require('../helpers').sql;
const pgp = require('pg-promise')({});
const db = pgp(config.db);

db.tx(() => {
    return this.batch([
        this.none(sql('boards.sql')),
        this.none(sql('lists.sql')),
        this.none(sql('cards.sql'))
    ]);
});

module.exports = db;
