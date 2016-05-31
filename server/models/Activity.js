const Promise = require('bluebird');
const _ = require('lodash');
const inflect = require('i')();
const db = require('../db');

const Activity = {
    create(entryId, entryTable, action) {
        return db.one(`
            INSERT INTO activity(entry_id, entry_table, action)
            VALUES ($1, $2, $3)
            RETURNING id, created_at, entry_id, entry_table, action
        `, [entryId, entryTable, action]).then(this._transformActivityItem);
    },

    findLast() {
        return db.query(`
            SELECT id, created_at, entry_id, entry_table, action
            FROM activity AS a
            ORDER BY created_at DESC
            LIMIT 15
        `).then(activity => {
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
