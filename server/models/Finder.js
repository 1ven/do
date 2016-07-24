const Promise = require('bluebird');
const relationsChecker = require('../utils/relationsChecker');
const db = require('../db');

function createTsquery(query) {
  const words = query.split(' ').filter(i => i.length);
  return words.reduce((acc, word, i) => (
    acc + word + ':*' + (i !== words.length - 1 ? '&' : '')
  ), '');
}

const Finder = {
  find(query, userId) {
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
    )
      .then(result => this.filterEntriesByUser(result, userId))
      .then(this.limitEntries.bind(this));
  },

  filterEntriesByUser(result, userId) {
    return Promise.filter(result, item => (
      relationsChecker.check({
        users: userId,
        [item.type.toLowerCase()]: item.id,
      })
    ));
  },

  limitEntries(result) {
    return result.reduce((acc, item) => {
      if (this.getEntriesByTypeLength(acc, item.type) <= 10) {
        return [...acc, item];
      }
      return acc;
    }, []);
  },

  getEntriesByTypeLength(arr, type) {
    return arr.filter(item => item.type === type).length;
  },
};

module.exports = Finder;
