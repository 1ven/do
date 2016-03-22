'use strict';

const db = require('../db');
const _ = require('lodash');
const listsApi = require('../api/lists-api');
const baseApi = require('../api/base-api');

const boardsApi = _.assign({}, baseApi, {
    table: 'boards',
    addList(boardId, listId) {
        return listsApi.getById(listId)
        .catch(() => {throw new Error('list does not exist on the board')})
        .then(() => db.none('UPDATE boards SET lists = array_append(lists, $2) WHERE id = $1', [boardId, listId]));
    },
    removeList(boardId, listId) {
        return this.getById(boardId)
        .then(board => {
            const updatedLists = _.without(board.lists, listId);
            return db.none('UPDATE boards SET lists = $2 WHERE id = $1', [boardId, updatedLists]);
        });
    }
});

module.exports = boardsApi;
