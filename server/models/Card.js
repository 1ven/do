const _ = require('lodash');
const Promise = require('bluebird');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const Card = {
  create(listId, cardData) {
    const cardId = shortid.generate();

    return db.one(
      `INSERT INTO cards (id, text) VALUES ($1, $2) RETURNING id`,
      [cardId, cardData.text]
    )
      .then(card => {
        return db.one(
          `INSERT INTO lists_cards VALUES ($1, $2);
          SELECT id, text, link FROM cards WHERE id = $2`,
          [listId, cardId]
        );
      });
  },

  getColors(cardId) {
      return db.query(
        `SELECT cl.id, color, cl.id = ANY(c.colors) AS active
        FROM colors AS cl
        LEFT JOIN cards AS c ON (c.id = $1)`,
        [cardId]
      );
  },

  addColor(cardId, colorId) {
    return db.none(
      `UPDATE cards SET colors = array_append(colors, $2)
      WHERE id = $1`,
      [cardId, colorId]
    );
  },

  removeColor(cardId, colorId) {
    return db.none(
      `UPDATE cards SET colors = array_remove(colors, $2)
      WHERE id = $1`,
      [cardId, colorId]
    );
  },

  update(cardId, data) {
    const _data = _.pick(data, ['text']);

    const props = _.keys(_data).map(k => pgp.as.name(k)).join();
    const values = _.values(_data);

    return db.one(
      `UPDATE cards SET ($2^) = ($3:csv)
      WHERE id = $1 RETURNING id, $2^`,
      [cardId, props, values]
    );
  },

  drop(cardId) {
    const now = Math.round(Date.now() / 1000);
    return db.one(
      `UPDATE cards SET deleted = $2 WHERE id = $1 RETURNING id`,
      [cardId, now]
    )
  },

  findById(cardId) {
    return db.one(
      `SELECT cr.id, cr.text, cr.link, bl.board_id,
      COALESCE (json_agg(cm) FILTER (WHERE cm.id IS NOT NULL), '[]') AS comments
      FROM cards as cr
      LEFT JOIN lists_cards AS lc ON (lc.card_id = cr.id)
      LEFT JOIN boards_lists AS bl ON (bl.list_id = lc.list_id)
      LEFT JOIN cards_comments AS cc ON (cr.id = cc.card_id)
      LEFT JOIN (
        SELECT cm.id, cm.created_at, cm.text, row_to_json(u) AS user FROM comments AS cm
        LEFT JOIN users_comments AS uc ON (uc.comment_id = cm.id)
        LEFT JOIN (
          SELECT id, username, avatar FROM users
        ) AS u ON (u.id = uc.user_id)
      ) AS cm ON (cm.id = cc.comment_id)
      WHERE cr.id = $1 AND deleted IS NULL
      GROUP BY cr.id, bl.board_id`,
      [cardId]
    );
  },

  move(sourceList, targetList) {
    return db.tx(function() {
      return this.none(
        `DELETE FROM lists_cards WHERE list_id = $1 OR list_id = $2`,
        [sourceList.id, targetList.id]
      )
        .then(() =>
          Promise.each([sourceList, targetList], list => {
            return Promise.each(list.cards, cardId => {
              return this.none(
                `INSERT INTO lists_cards VALUES ($1, $2)`,
                [list.id, cardId]
              );
            });
          })
        );
    });
  },
};

module.exports = Card;
