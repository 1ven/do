'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');
const _ = require('lodash');

exports.sql = function(file) {
    const p = path.resolve(__dirname, './db/tables/', file);
    const options = {
        minify: true
    };
    return new QueryFile(p, options);
};

exports.validate = function(props, fields) {
    if (!_.isPlainObject(props)) {
        throw new Error('`props` must be a plain object');
    }

    if (!_.isPlainObject(fields)) {
        throw new Error('`fields` must be a plain object');
    }

    const errors = [];

    for (let key in fields) {
        const checks = fields[key];
        const value = props[key] + '';

        if (! (checks instanceof Array)) {
            throw new Error('Assertions must be an array');
        }

        checks.forEach(check => {
            if (!check.assert(value)) {
                errors.push({
                    name: key,
                    message: check.message,
                    value
                });
            }
        });
    }

    return errors;
};
