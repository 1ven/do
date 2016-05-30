const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const Activity = require('./Activity');

const Card = {
    update(id, data) {
        const _data = _.pick(data, ['text']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(`
            UPDATE cards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, text, link
        `, [id, props, values])
            .then(card => {
                return Activity.create(card.id, 'cards', 'Updated')
                    .then(activity => {
                        return _.assign({}, card, { activity });
                    });
            });
    },

    drop(id) {
        return db.one(`DELETE FROM cards WHERE id = $1 RETURNING id`, [id]);
    },

    createComment(userId, cardId, commentData) {
        const commentId = shortid.generate();

        return db.one(`
            INSERT INTO comments(id, text) VALUES ($3, $4);
            INSERT INTO cards_comments VALUES ($2, $3);
            INSERT INTO users_comments VALUES ($1, $3);
            SELECT cm.id, cm.created_at, cm.text, row_to_json(u) AS user FROM comments AS cm
            LEFT JOIN users_comments AS uc ON (uc.comment_id = cm.id)
            LEFT JOIN (
                SELECT id, username, avatar FROM users
            ) AS u ON (u.id = uc.user_id)
            WHERE cm.id = $3
        `, [userId, cardId, commentId, commentData.text])
    },

    findById(cardId) {
        return db.one(`
            SELECT cr.id, cr.text, cr.link,
                COALESCE (json_agg(cm) FILTER (WHERE cm.id IS NOT NULL), '[]') AS comments
            FROM cards as cr
            LEFT JOIN cards_comments AS cc ON (cr.id = cc.card_id)
            LEFT JOIN (
                SELECT cm.id, cm.created_at, cm.text, row_to_json(u) AS user FROM comments AS cm
                LEFT JOIN users_comments AS uc ON (uc.comment_id = cm.id)
                LEFT JOIN (
                    SELECT id, username, avatar FROM users
                ) AS u ON (u.id = uc.user_id)
            ) AS cm ON (cm.id = cc.comment_id)
            WHERE cr.id = $1
            GROUP BY cr.id
        `, [cardId]);
    }
};

module.exports = Card;
