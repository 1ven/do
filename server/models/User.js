'use strict';

const _ = require('lodash');
const Base = require('./Base');

const User = _.assign({}, Base, {
    table: 'users',
    immutableFields: ['id', 'username', 'hash', 'salt'],
    hiddenFields: ['hash', 'salt', 'email'],

    add(props) {},
});

module.exports = User;
