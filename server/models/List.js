const _ = require('lodash');
const shortid = require('shortid');
const pgp = require('pg-promise');
const db = require('../db');
const Activity = require('./Activity');

const List = {
    update(userId, listId, data) {
        const _data = _.pick(data, ['title']);

        if (_.isEmpty(_data)) return;

        const props = _.keys(_data).map(k => pgp.as.name(k)).join();
        const values = _.values(_data);

        return db.one(`
            UPDATE lists SET ($2^) = ($3:csv) WHERE id = $1 RETURNING id, title, link
        `, [listId, props, values])
            .then(list => {
                return Activity.create(userId, listId, 'lists', 'Updated')
                    .then(activity => {
                        return _.assign({}, list, { activity });
                    });
            });
    },

    drop(id) {
        return db.one(`DELETE FROM lists WHERE id = $1 RETURNING id`, [id]);
    },

    createCard(userId, listId, cardData) {
        const cardId = shortid.generate();

        return db.one(`
            INSERT INTO cards (id, text) VALUES ($1, $2) RETURNING id
        `, [cardId, cardData.text])
            .then(card => {
                return db.one(`
                    INSERT INTO lists_cards VALUES ($1, $2);
                    SELECT id, text, link, bl.board_id FROM cards AS c
                    LEFT JOIN lists_cards AS lc ON (lc.card_id = c.id) 
                    LEFT JOIN boards_lists AS bl ON (bl.list_id = lc.list_id)
                    WHERE id = $2
                `, [listId, cardId]);
            })
            .then(card => {
                return Activity.create(userId, cardId, 'cards', 'Created')
                    .then(activity => {
                        return _.assign({}, card, { activity });
                    });
            });
    },

    archive(listId) {
        return db.one(`
            UPDATE lists SET (archived) = (true) WHERE id = $1 RETURNING id
        `, [listId]);
    }
};

module.exports = List;
