'use strict';

const _ = require('lodash');
const crypto = require('crypto');
const Base = require('./Base');

const User = _.assign({}, Base, {
    table: 'users',
    immutableFields: ['id', 'username', 'hash', 'salt'],
    hiddenFields: ['hash', 'salt', 'email'],

    register(props) {
        if (!props || !props.password) {
            throw new Error('Password is not provided');
        }

        const salt = Math.random() + '';
        const hash = this.encryptPassword(props.password, salt);

        delete props.password;

        return this.create(_.assign({}, props, {
            hash,
            salt
        }));
    },

    encryptPassword(password, salt) {
        return crypto.createHash('md5').update(password + salt).digest('hex');
    }
});

module.exports = User;
