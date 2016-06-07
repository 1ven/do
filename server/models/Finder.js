const Promise = require('bluebird');
const db = require('../db');

function createTsquery(query) {
  const words = query.split(' ').filter(i => i.length);
  return words.reduce((acc, word, i) => (
    acc + word + ':*' + (i !== words.length - 1 ? '&' : '')
  ), '');
}

const Finder = {
  find(query) {
    if (typeof query !== 'string') {
      throw new TypeError('`query` must be a string');
    }

    if (!query.length) {
      return Promise.resolve([]);
    }

    const tsquery = createTsquery(query);

    return db.query(
      `SELECT id, content, type, link FROM (
        SELECT id, content, type, link, to_tsvector(content) AS c FROM search
      ) AS s
      WHERE s.c @@ to_tsquery($1)`,
      [tsquery]
    );
  },
};

module.exports = Finder;
