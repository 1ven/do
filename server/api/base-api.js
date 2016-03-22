'use strict'

const db = require('../db');
const _ = require('lodash');

module.exports = {
    create(data) {
        if (typeof data !== 'object') { throw new Error('wrong data type'); }

        const columns = _.keys(data).join(',');
        const values = _.values(data);
        const template = _.map(values, (item, index) => `$${index + 1}`).join(',');

        return db.none(`INSERT INTO ${this.table} (${columns}) values (${template})`, values);
    },
    remove(id) {
        var id = parseInt(id);
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
    }
};
