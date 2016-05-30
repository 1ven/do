const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const Activity = require('./Activity');

const Board = {
    update(id, data) {
        const _data = _.pick(data, ['title']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(`
            UPDATE boards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, title, link
        `, [id, props, values])
            .then(board => {
                return Activity.create(id, 'boards', 'Updated')
                    .then(activity => {
                        return _.assign({}, board, { activity });
                    });
            });
    },

    drop(id) {
        return db.one(`DELETE FROM boards WHERE id = $1 RETURNING id`, [id]);
    },

    createList(boardId, listData) {
        const listId = shortid.generate();

        return db.one(`
            INSERT INTO lists (id, title) VALUES ($1, $2)
            RETURNING id
        `, [listId, listData.title])
            .then(list => {
                return db.one(`
                    INSERT INTO boards_lists VALUES ($1, $2);
                    SELECT id, title, link FROM lists WHERE id = $2
                `, [boardId, list.id]);
            })
            .then(list => {
                return Activity.create(list.id, 'lists', 'Created')
                    .then(activity => {
                        return _.assign({}, list, { activity });
                    });
            });
    },

    findById(id) {
        return db.one(`
            SELECT b.id, b.title, b.link,
                COALESCE (json_agg(l) FILTER (WHERE l.id IS NOT NULL), '[]') AS lists
            FROM boards AS b
            LEFT JOIN boards_lists ON (b.id = board_id)
            LEFT JOIN (
                SELECT l.id, l.title, l.link,
                    COALESCE (json_agg(c) FILTER (WHERE c.id IS NOT NULL), '[]') AS cards
                FROM lists AS l
                LEFT JOIN lists_cards ON (l.id = list_id)
                LEFT JOIN (
                    SELECT id, text, link from cards
                ) AS c ON (c.id = card_id)
                GROUP BY l.id
            ) AS l ON (l.id = list_id)
            WHERE b.id = $1
            GROUP BY b.id
            ORDER BY b.index
        `, [id]);
    },

    findAllByUser(userId) {
        return db.query(`
            SELECT b.id, b.title, b.link,
                COALESCE (json_agg(l) FILTER (WHERE l.id IS NOT NULL), '[]') AS lists
            FROM boards AS b
            LEFT JOIN boards_lists AS bl ON (b.id = bl.board_id)
            LEFT JOIN (
                SELECT l.id, l.title, l.link,
                    COALESCE (json_agg(c) FILTER (WHERE c.id IS NOT NULL), '[]') AS cards
                FROM lists AS l
                LEFT JOIN lists_cards ON (l.id = list_id)
                LEFT JOIN (
                    SELECT id, text, link from cards
                ) AS c ON (c.id = card_id)
                GROUP BY l.id
            ) AS l ON (l.id = list_id)
            INNER JOIN users_boards AS ub ON (user_id = $1 AND ub.board_id = b.id)
            GROUP BY b.id
            ORDER BY b.index
        `, [userId]);
    }
};

module.exports = Board;
