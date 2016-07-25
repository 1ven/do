'use strict';

const bluebird = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: bluebird,
});
const sql = require('../utils/sql');

const db = pgp(process.env.DATABASE_URL);

db.tx(function() {
  return this.none(sql('activity.sql'))
    .then(() => this.none(sql('comments.sql')))
    .then(() => this.none(sql('cards.sql')))
    .then(() => this.none(sql('lists.sql')))
    .then(() => this.none(sql('boards.sql')))
    .then(() => this.none(sql('users.sql')))
    .then(() => this.none(sql('colors.sql')))
    .then(() => this.none(sql('views.sql')))
}).catch(err => { throw err; });

module.exports = db;
