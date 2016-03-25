'use strict';

const config = require('../config');
const sql = require('../helpers').sql;
const pgp = require('pg-promise')({});
const db = pgp(config.db);

const boards = sql('boards.sql');
const lists = sql('lists.sql');
const cards = sql('cards.sql');

db.query(boards);
db.query(lists);
db.query(cards);

module.exports = db;
