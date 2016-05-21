const _ = require('lodash');
const pgp = require('pg-promise');
const db = require('../db');

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
    }
};

module.exports = Card;
