'use strict';

const _ = require('lodash');
const Base = require('./Base');

const User = _.assign({}, Base, {
    table: 'users',
    immutableFields: ['id', 'username', 'hash', 'salt'],
});

module.exports = User;
