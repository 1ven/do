'use strict';

const db = require('../db');
const _ = require('lodash');
const listsApi = require('../api/lists-api');
const baseApi = require('../api/base-api');

const boardsApi = _.assign({}, baseApi, {
    table: 'boards',
    getFull(id) {
        return this.getById(id)
        .then(board => {
            if (!board.lists) { return board; }

            const promises = _.map(board.lists, listId => {
                return listsApi.getFull(listId);
            });

            return Promise.all(promises)
            .then(fullLists => {
                return _.assign({}, board, { lists: fullLists });
            });
        });
    },
    // TODO: Throw error, when trying to add list on nonexistent board. And fix error on 28 line.
    addList(boardId, listId) {
        return listsApi.getById(listId)
        .catch(() => {throw new Error('list does not exist')})
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
