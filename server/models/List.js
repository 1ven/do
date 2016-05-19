const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');

const List = {
    update(id, data) {
        const _data = _.pick(data, ['title']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(
            `UPDATE lists SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, title`,
            [id, props, values]
        );
    },

    drop(id) {
        return db.one(`DELETE FROM lists WHERE id = $1 RETURNING id`, [id]);
    },

    createCard(listId, cardData) {
        const id = shortid.generate();

        return db.one(`INSERT INTO cards (id, text) VALUES ($1, $2) RETURNING id, text`,
        [id, cardData.text])
            .then(card => {
                return db.none(`INSERT INTO lists_cards VALUES ($1, $2)`, [listId, card.id])
                    .then(() => card);
            });
    }
};

module.exports = List;
