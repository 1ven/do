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
    addList(boardId, listId) {
        return this.addIdToArray('lists', boardId, listId, listsApi.getById.bind(listsApi));
    },
    removeList(boardId, listId) {
        return this.removeIdFromArray('lists', boardId, listId);
    }
});

module.exports = boardsApi;
