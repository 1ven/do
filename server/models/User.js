const _ = require('lodash');
const pgp = require('pg-promise');
const db = require('../db');

const User = {
    update(id, data) {
        const _data = _.pick(data, ['username']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(
            `UPDATE users SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, username`,
            [id, props, values]
        );
    },

    drop(id) {
        return db.one(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
    },

    createBoard(userId, boardData) {
        return db.one(`INSERT INTO boards (id, title) VALUES ($1, $2) RETURNING id, title`,
        [boardData.id, boardData.title])
            .then(board => {
                return db.none(`INSERT INTO users_boards VALUES ($1, $2)`, [userId, board.id])
                    .then(() => board);
            });
    }
};

module.exports = User;
