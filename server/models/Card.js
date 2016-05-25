const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const Comment = require('./Comment');

const Card = {
    update(id, data) {
        const _data = _.pick(data, ['text']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(
            `UPDATE cards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, text`,
            [id, props, values]
        );
    },

    drop(id) {
        return db.one(`DELETE FROM cards WHERE id = $1 RETURNING id`, [id]);
    },

    createComment(userId, cardId, commentData) {
        const commentId = shortid.generate();

        return db.none(`
            INSERT INTO comments(id, text) VALUES ($3, $4);
            INSERT INTO cards_comments VALUES ($2, $3);
            INSERT INTO users_comments VALUES ($1, $3)
        `, [userId, cardId, commentId, commentData.text])
            .then(() => Comment.findByIds([commentId]))
            .then(comments => comments[0]);
    }
};

module.exports = Card;
