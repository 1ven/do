const _ = require('lodash');
const pgp = require('pg-promise');
const db = require('../db');

const Finder = {
    find(query) {
        if (typeof query !== 'string') {
            throw new TypeError('`query` must be a string');
        }

        const tsquery = createTsquery(query);

        return db.query(`
            SELECT id, content, type FROM (
                SELECT id, content, type, to_tsvector(content) AS c FROM search
            ) AS s
            WHERE s.c @@ to_tsquery($1)
        `, [tsquery]);
    }
};

function createTsquery(query) {
    const words = query.split(' ');
    return words.reduce((acc, word, i) => {
        return acc + word + ':*' + (i !== words.length - 1 ? '&' : '');
    }, '');
}

module.exports = Finder;
