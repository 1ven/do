'use strict';

const bluebird = require('bluebird');
const pgp = require('pg-promise')({
    promiseLib: bluebird
});
const config = require('../config');
const helpers = require('../helpers');

const db = pgp(config.db);

// db.tx(function () {
//     return this.sequence(index => {
//         switch(index) {
//             case 0:
//                 return this.query(sql('cards.sql'));
//             case 1:
//                 return this.query(sql('lists.sql'));
//             case 2:
//                 return this.query(sql('boards.sql'));
//         }
//     });
// });

module.exports = db;
