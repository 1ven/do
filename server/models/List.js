'use strict';

const _ = require('lodash');
const db = require('../db');
const Base = require('./Base');
const Card = require('./Card');

const List = _.assign({}, Base, {
    table: 'lists',
    children: [Card],
    immutableFields: ['id'],

    createCard(listId, cardProps) {
        return this.createChild(listId, cardProps, Card);
    },
});

module.exports = List;
