'use strict';

const _ = require('lodash');
const db = require('../db');
const Base = require('./Base');
const Card = require('./Card');

const List = _.assign({}, Base, {
    table: 'lists',
    children: [Card],
    mutableFields: ['title'],
    visibleFields: ['id', 'title'],

    createCard(listId, cardProps) {
        return this.createChild(listId, cardProps, Card);
    },
});

module.exports = List;
