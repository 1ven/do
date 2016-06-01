const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const Activity = require('./Activity');

const Board = {
    update(userId, boardId, data) {
        const _data = _.pick(data, ['title']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(`
            UPDATE boards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, title, link
        `, [boardId, props, values])
            .then(board => {
                return Activity.create(userId, boardId, 'boards', 'Updated')
                    .then(activity => {
                        return _.assign({}, board, { activity });
                    });
            });
    },

    drop(id) {
        return db.one(`DELETE FROM boards WHERE id = $1 RETURNING id`, [id]);
    },

    createList(userId, boardId, listData) {
        const listId = shortid.generate();

        return db.one(`
            INSERT INTO lists (id, title) VALUES ($1, $2)
            RETURNING id
        `, [listId, listData.title])
            .then(list => {
                return db.one(`
                    INSERT INTO boards_lists VALUES ($1, $2);
                    SELECT id, title, link FROM lists WHERE id = $2
                `, [boardId, listId]);
            })
            .then(list => {
                return Activity.create(userId, listId, 'lists', 'Created')
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
                LEFT JOIN lists_cards AS lc ON (l.id = lc.list_id)
                LEFT JOIN (
                    SELECT id, text, link FROM cards AS c
                ) AS c ON (c.id = lc.card_id)
                GROUP BY l.id
            ) AS l ON (l.id = list_id)
            WHERE b.id = $1
            GROUP BY b.id
            ORDER BY b.index
        `, [id]);
    },

    findAllByUser(userId) {
        return db.query(`
            SELECT b.id, b.title, b.link, b.starred, (
                SELECT count(list_id)::integer FROM boards_lists
                WHERE board_id = b.id
            ) AS lists_length, (
                SELECT count(card_id)::integer FROM lists_cards AS lc
                JOIN boards_lists AS bl ON (bl.board_id = b.id) AND (bl.list_id = lc.list_id)
            ) AS cards_length
            FROM boards AS b
            INNER JOIN users_boards AS ub ON (user_id = $1 AND ub.board_id = b.id)
            GROUP BY b.id
            ORDER BY b.index
        `, [userId]);
    },

    archive(boardId) {
        return db.one(`
            UPDATE boards SET (archived) = (true) WHERE id = $1 RETURNING id
        `, [boardId]);
    },

    toggleStarred(userId, boardId, starred) {
        const action = starred ? 'Starred' : 'Unstarred';

        return db.one(`
            UPDATE boards SET (starred) = ($2) WHERE id = $1;
            SELECT b.id, b.title, b.link, b.starred, (
                SELECT count(list_id)::integer FROM boards_lists
                WHERE board_id = b.id
            ) AS lists_length, (
                SELECT count(card_id)::integer FROM lists_cards AS lc
                JOIN boards_lists AS bl ON (bl.board_id = b.id) AND (bl.list_id = lc.list_id)
            ) AS cards_length
            FROM boards AS b
            WHERE b.id = $1
            GROUP BY b.id
            ORDER BY b.index
        `, [boardId, starred])
            .then(board => {
                return Activity.create(userId, boardId, 'boards', action)
                    .then(activity => {
                        return _.assign({}, board, { activity });
                    });
            });
    }
};

module.exports = Board;
