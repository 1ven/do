const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const List = {
  create(boardId, listData) {
    const listId = shortid.generate();

    return db.one(
      `INSERT INTO lists (id, title) VALUES ($1, $2)
      RETURNING id`,
      [listId, listData.title]
    )
      .then(list => {
        return db.one(
          `INSERT INTO boards_lists VALUES ($1, $2);
          SELECT id, title, link FROM lists WHERE id = $2`,
          [boardId, listId]
        );
      });
  },

  update(listId, data) {
    const _data = _.pick(data, ['title']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return db.one(
      `UPDATE lists SET ($2^) = ($3:csv)
      WHERE id = $1 RETURNING id, $2^`,
      [listId, props, values]
    );
  },

  drop(listId) {
    const now = Math.round(Date.now() / 1000);
    return db.one(
      `UPDATE cards c SET deleted = $2
      WHERE c.id IN (
        SELECT card_id FROM lists_cards
        WHERE list_id = $1
      );
      UPDATE lists SET deleted = $2
      WHERE id = $1 RETURNING id`,
      [listId, now]
    );
  },
};

module.exports = List;
