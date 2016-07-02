const _ = require('lodash');
const Promise = require('bluebird');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const Board = {
  update(boardId, data) {
    const _data = _.pick(data, ['title', 'starred', 'description']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return db.one(
      `UPDATE boards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, $2^`,
      [boardId, props, values]
    );
  },

  drop(boardId) {
    const now = Math.round(Date.now() / 1000);
    return db.one(
      `UPDATE boards SET deleted = $2
      WHERE id = $1 RETURNING id`,
      [boardId, now]
    );
  },

  create(userId, data) {
    const id = shortid.generate();
    const _data = _.pick(data, ['title', 'description']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return db.one(
      `INSERT INTO boards (id, $2^)
      VALUES ($1, $3:csv) RETURNING id, link, $2^`,
      [id, props, values]
    )
      .then(board => {
        return db.none(
          `INSERT INTO users_boards VALUES ($1, $2)`,
          [userId, board.id]
        )
          .then(() => board);
      });
  },

  findById(id) {
    return db.one(
      `SELECT b.id, b.title, b.description, b.link,
      COALESCE (json_agg(l) FILTER (WHERE l.id IS NOT NULL), '[]') AS lists
      FROM boards AS b
      LEFT JOIN boards_lists ON (b.id = board_id)
      LEFT JOIN (
        SELECT l.id, l.title, l.link,
        COALESCE (json_agg(c) FILTER (WHERE c.id IS NOT NULL), '[]') AS cards
        FROM lists AS l
        LEFT JOIN lists_cards AS lc ON (l.id = lc.list_id)
        LEFT JOIN (
          SELECT c.id, c.text, c.link, json_agg(json_build_object(
            'id', cl.id,
            'color', cl.color,
            'active', cl.id = ANY(c.colors)
          )) AS colors
          FROM cards AS c
          CROSS JOIN colors AS cl
          INNER JOIN lists_cards AS lc ON (lc.card_id = c.id)
          WHERE deleted IS NULL
          GROUP BY c.id, lc.card_index
          ORDER BY lc.card_index
        ) AS c ON (c.id = lc.card_id)
        INNER JOIN boards_lists AS bl ON (bl.list_id = l.id)
        WHERE deleted IS NULL
        GROUP BY l.id, bl.list_index
        ORDER BY bl.list_index
      ) AS l ON (l.id = list_id)
      WHERE b.id = $1 AND deleted IS NULL
      GROUP BY b.id`,
      [id]
    );
  },

  findAllByUser(userId, limit) {
    limit = limit || 'all';
    return db.query(`
      SELECT b.id, b.title, b.link, b.starred, (
        SELECT count(list_id)::integer FROM boards_lists AS bl
        INNER JOIN lists AS l ON (l.id = bl.list_id AND deleted IS NULL)
        WHERE board_id = b.id
      ) AS lists_length, (
        SELECT count(card_id)::integer FROM lists_cards AS lc
        INNER JOIN boards_lists AS bl ON (bl.board_id = b.id) AND (bl.list_id = lc.list_id)
        INNER JOIN cards AS c ON (c.id = lc.card_id AND deleted IS NULL)
        WHERE c.deleted IS NULL
      ) AS cards_length
      FROM boards AS b
      INNER JOIN users_boards AS ub ON (user_id = $1 AND ub.board_id = b.id)
      WHERE deleted IS NULL
      GROUP BY b.id, ub.board_index
      ORDER BY ub.board_index
      LIMIT $2^`,
      [userId, limit]
    );
  },

  findAllIdsByUser(userId) {
    return db.query(
      `SELECT b.id FROM boards AS b
      INNER JOIN users_boards AS ub ON (ub.user_id = $1 AND ub.board_id = b.id)
      WHERE deleted IS NULL
      GROUP BY b.id, ub.board_index
      ORDER BY ub.board_index`,
      [userId]
    )
      .then(result => result.map(entry => entry.id));
  },

  move(sourceId, targetId) {
    const query = 'SELECT board_index FROM users_boards WHERE board_id = $1';
    return Promise.all([
      db.one(query, [sourceId]),
      db.one(query, [targetId]),
    ])
      .then(result => result.map(entry => entry.board_index))
      .then(indexes => {
        const sourceIndex = indexes[0];
        const targetIndex = indexes[1];

        return db.one(`SELECT max(board_index) FROM users_boards`)
          .then(result => result.max + 10)
          .then(tempIndex => {
            return db.none(
              `UPDATE users_boards SET board_index = $4
              WHERE board_id = $3;
              ${sourceIndex < targetIndex ?
                `UPDATE users_boards SET board_index = board_index - 1
                WHERE board_index > $1 AND board_index <= $2` :

                `UPDATE users_boards SET board_index = board_index + 1
                WHERE board_index < $1 AND board_index >= $2`
              };
              UPDATE users_boards SET board_index = $2
              WHERE board_id = $3`,
              [sourceIndex, targetIndex, sourceId, tempIndex]
            );
          })
      });
  },
};

module.exports = Board;
