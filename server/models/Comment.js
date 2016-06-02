const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const Comment = {
    create(userId, cardId, commentData) {
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

};

module.exports = Comment;
