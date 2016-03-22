'use strict';

const config = require('../config');
const fs = require('fs');
const pgp = require('pg-promise')({});
const db = pgp(config.db);

const boards = fs.readFileSync('server/db/tables/boards.sql', 'utf8');
const lists = fs.readFileSync('server/db/tables/lists.sql', 'utf8');
const cards = fs.readFileSync('server/db/tables/cards.sql', 'utf8');

db.query(boards);
db.query(lists);
db.query(cards);

module.exports = db;
