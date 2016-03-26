'use strict';

const boardsApi = require('../api/boards-api');
const listsApi = require('../api/lists-api');

module.exports = (post) => {
    post('/lists/create', body => {
        const boardId = body.boardId;
        const title = body.title;

        return listsApi.create({ title })
        .then(result => {
            const listId = result.id;

            return boardsApi.addList(boardId, listId)
            .then(() => ({ listId }));
        });
    }, ['title', 'boardId']);

    post('/lists/remove', body => {
        const boardId = body.boardId;
        const listId = body.listId;

        return listsApi.remove(listId)
        .then(() => boardsApi.removeList(boardId, listId));
    }, ['boardId', 'listId']);
};
