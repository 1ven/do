'use strict'

const db = require('../db');
const _ = require('lodash');

module.exports = {
    create(data) {
        if (typeof data !== 'object') { throw new Error('wrong data type'); }

        const columns = _.keys(data).join(',');
        const values = _.values(data);
        const template = _.map(values, (item, index) => `$${index + 1}`).join(',');

        return db.one(`INSERT INTO ${this.table} (${columns}) values (${template}) returning id`, values);
    },
    remove(id) {
        var id = parseInt(id);
        // TODO: Implement this queries as one task.
        return db.one(`SELECT * FROM ${this.table} WHERE id = $1`, id)
        .then(() => {
            return db.none(`DELETE FROM ${this.table} WHERE id = $1`, id);
        });
    },
    getById(id) {
        return db.one(`SELECT * FROM ${this.table} WHERE id = $1`, id);
    },
    getAll() {
        return db.any(`SELECT * FROM ${this.table}`);
    },
    getSome(ids) {
        const template = _.map(ids, (id, index) => `$${index + 1}`).join(',');
        return db.query(`SELECT * FROM ${this.table} WHERE id IN (${template})`, ids);
    },
    // TODO: Throw error, when trying to add list on nonexistent board. And fix error on 28 line.
    addIdToArray(column, entryId, itemId, getItemById) {
        return getItemById(itemId)
        .catch(handleExistanceError.bind(null, this))
        .then(() => {
            return db.none(`UPDATE ${this.table} SET ${column} = array_append(${column}, $2) WHERE id = $1`,
            [entryId, itemId]);
        });
    },
    removeIdFromArray(column, entryId, itemId) {
        return this.getById(entryId)
        .then(entry => {
            const updatedItems = _.without(entry[column], itemId);
            return db.none(`UPDATE ${this.table} SET ${column} = $2 WHERE id = $1`, [entryId, updatedItems]);
        });
    }
};


function handleExistanceError(api, err) {
    if (err.message.search(/No data returned/) !== -1) {
        throw new Error(`${api.table} entry does not exist`);
    }
    throw err;
};
