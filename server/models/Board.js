'use strict';

const _ = require('lodash');
const db = require('../db');
const Base = require('./Base');
const List = require('./List');

const Board = _.assign({}, Base, {
    table: 'boards',
    children: [List],
    immutableFields: ['id'],

    createList(boardId, listProps) {
        return this.createChild(boardId, listProps, List);
    },
});

module.exports = Board;
