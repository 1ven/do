const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const Comment = {
    findByIds(commentIds) {
        return db.query(`
            SELECT c.id, c.created_at, c.text, row_to_json(u) AS user FROM comments AS c
            LEFT JOIN users_comments AS uc ON (uc.comment_id = c.id)
            LEFT JOIN (
                SELECT id, username FROM users
            ) AS u ON (u.id = uc.user_id)
            WHERE c.id IN ($1^)
        `, [pgp.as.csv(commentIds)]);
    }
};

module.exports = Comment;
