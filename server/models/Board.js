const _ = require('lodash');
const pgp = require('pg-promise');
const db = require('../db');

const Board = {
    update(id, data) {
        const _data = _.pick(data, ['title']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(
            `UPDATE boards SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, title`,
            [id, props, values]
        );
    },

    drop(id) {
        return db.one(`DELETE FROM boards WHERE id = $1 RETURNING id`, [id]);
    },

    createList(boardId, listData) {
        return db.one(`INSERT INTO lists (id, title) VALUES ($1, $2) RETURNING id, title`,
        [listData.id, listData.title])
            .then(list => {
                return db.none(`INSERT INTO boards_lists VALUES ($1, $2)`, [boardId, list.id])
                    .then(() => list);
            });
    }
};

module.exports = Board;
