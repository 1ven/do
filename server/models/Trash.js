const db = require('../db');
const _ = require('lodash');
const inflect = require('i')();
const Activity = require('./Activity');

const Trash = {
  find(userId, pageIndex) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('`userId` is not provided or given with wrong type');
    }

    if (!pageIndex || typeof pageIndex !== 'number') {
      throw new Error('`pageIndex` is not provided or given with wrong type');
    }

    return db.query(
      `SELECT entry_id, entry_table, content, deleted
      FROM trash WHERE user_id = $1
      ORDER BY deleted
      LIMIT 20 OFFSET $2 * 20`,
      [userId, pageIndex - 1]
    )
      .then(entries => {
        return db.one(
          `SELECT ceil(count(entry_id) / 20.0)::integer AS pages_length FROM trash
          WHERE user_id = $1`,
          [userId]
        )
          .then(result => ({
            pages_length: result.pages_length,
            entries,
          }));
      });
  },

  restore(userId, entryId, table) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('`userId` is not provided or given with wrong type');
    }

    if (!entryId || typeof entryId !== 'string') {
      throw new Error('`entryId` is not provided or given with wrong type');
    }

    if (!table || typeof table !== 'string') {
      throw new Error('`table` is not provided or given with wrong table');
    }

    return db.one(
      `UPDATE $1~ SET deleted = null WHERE id = $2
      RETURNING id, title, link`,
      [table, entryId]
    )
      .then(entry => {
        return Activity.create(userId, entryId, table, 'Restored')
          .then(activity => _.assign({}, entry, { activity }));
      });
  },
};

module.exports = Trash;
