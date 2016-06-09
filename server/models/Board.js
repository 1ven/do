const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const validator = require('../utils/validator');
const Activity = require('./Activity');

const Board = {
  update(userId, boardId, data, activityAction) {
    const _data = _.pick(data, ['title']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return this.validate(_data).then(() => {
      return db.one(
        `UPDATE boards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, $2^`,
        [boardId, props, values]
      )
        .then(board => {
          return Activity.create(userId, boardId, 'boards', activityAction || 'Updated')
            .then(activity => {
              return _.assign({}, board, { activity });
            });
        });
      });
  },

  drop(id) {
    return db.one(
      `UPDATE boards SET deleted = true
      WHERE id = $1 RETURNING id`,
      [id]
    );
  },

  validate(props) {
    return validator.validate(props, {
      title: [{
        assert: value => !! value,
        message: 'Title is required',
      }],
    });
  },

  create(userId, props) {
    const id = shortid.generate();

    return this.validate(props).then(() => {
      return db.one(
        `INSERT INTO boards (id, title)
        VALUES ($1, $2) RETURNING id, title, link`,
        [id, props.title]
      )
        .then(board => {
          return db.none(
            `INSERT INTO users_boards VALUES ($1, $2)`,
            [userId, board.id]
          )
            .then(() => Activity.create(userId, id, 'boards', 'Created'))
            .then(activity => {
              return _.assign({}, board, { activity });
            });
        });
    });
  },

  findById(id) {
    return db.one(
      `SELECT b.id, b.title, b.link,
      COALESCE (json_agg(l) FILTER (WHERE l.id IS NOT NULL), '[]') AS lists
      FROM boards AS b
      LEFT JOIN boards_lists ON (b.id = board_id)
      LEFT JOIN (
        SELECT l.id, l.title, l.link,
        COALESCE (json_agg(c) FILTER (WHERE c.id IS NOT NULL), '[]') AS cards
        FROM lists AS l
        LEFT JOIN lists_cards AS lc ON (l.id = lc.list_id)
        LEFT JOIN (
          SELECT id, text, link FROM cards AS c
          WHERE deleted = false
        ) AS c ON (c.id = lc.card_id)
        WHERE deleted = false
        GROUP BY l.id
      ) AS l ON (l.id = list_id)
      WHERE b.id = $1 AND deleted = false
      GROUP BY b.id
      ORDER BY b.index`,
      [id]
    );
  },

  findAllByUser(userId) {
    return db.query(`
      SELECT b.id, b.title, b.link, b.starred, (
        SELECT count(list_id)::integer FROM boards_lists AS bl
        INNER JOIN lists AS l ON (l.id = bl.list_id AND deleted = false)
        WHERE board_id = b.id
      ) AS lists_length, (
        SELECT count(card_id)::integer FROM lists_cards AS lc
        INNER JOIN boards_lists AS bl ON (bl.board_id = b.id) AND (bl.list_id = lc.list_id)
        INNER JOIN cards AS c ON (c.id = lc.card_id AND deleted = false)
      ) AS cards_length
      FROM boards AS b
      INNER JOIN users_boards AS ub ON (user_id = $1 AND ub.board_id = b.id)
      WHERE deleted = false
      GROUP BY b.id
      ORDER BY b.index`,
      [userId]
    );
  },

  toggleStarred(userId, boardId) {
    return db.one(
      `UPDATE boards SET starred = NOT starred
      WHERE id = $1 RETURNING id, starred`,
      [boardId]
    );
  },
};

module.exports = Board;
