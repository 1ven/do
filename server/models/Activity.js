const Promise = require('bluebird');
const _ = require('lodash');
const inflect = require('i')();
const db = require('../db');

const Activity = {
    create(userId, entryId, entryTable, action) {
        return db.one(`
            INSERT INTO activity(user_id, entry_id, entry_table, action)
            VALUES ($1, $2, $3, $4)
            RETURNING id, created_at, entry_id, entry_table, action
        `, [userId, entryId, entryTable, action]).then(this._transformActivityItem);
    },

    findLast(userId) {
        return db.query(`
            SELECT id, created_at, entry_id, entry_table, action
            FROM activity AS a
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT 15
        `, [userId]).then(activity => {
            return Promise.map(activity, this._transformActivityItem);
        });
    },

    _transformActivityItem(item) {
        const col = item.entry_table === 'cards' ? 'text' : 'title';

        return db.one(`
            SELECT id, $3~ AS title, link FROM $2~ WHERE id = $1
        `, [item.entry_id, item.entry_table, col])
            .then(entry => {
                const _item = _.omit(item, ['entry_id', 'entry_table']);

                return _.assign({}, _item, {
                    type: inflect.singularize(item.entry_table),
                    entry: _.pick(entry, ['title', 'link'])
                });
            });
    }
};

module.exports = Activity;
