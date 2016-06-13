const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const validator = require('../utils/validator');

const List = {
  create(boardId, listData) {
    const listId = shortid.generate();

    return this.validate(listData).then(() => {
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
    });
  },

  validate(props) {
    return validator.validate(props, {
      title: [{
        assert: value => !! value,
        message: 'Title is required',
      }],
    });
  },

  update(listId, data) {
    const _data = _.pick(data, ['title']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return this.validate(_data).then(() => {
      return db.one(
        `UPDATE lists SET ($2^) = ($3:csv)
        WHERE id = $1 RETURNING id, $2^`,
        [listId, props, values]
      );
    });
  },

  drop(listId) {
    const now = Math.round(Date.now() / 1000);
    return db.one(
      `UPDATE lists SET deleted = $2
      WHERE id = $1 RETURNING id`,
      [listId, now]
    );
  },

  getParentsIds(listId) {
    return db.one(
      `SELECT bl.board_id FROM lists AS l
      INNER JOIN boards_lists AS bl ON (bl.list_id = l.id)
      WHERE l.id = $1`,
      [listId]
    );
  },
};

module.exports = List;
