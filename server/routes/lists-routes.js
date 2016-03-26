'use strict';

const boardsApi = require('../api/boards-api');
const listsApi = require('../api/lists-api');
const checkRequiredParams = require('../helpers').checkRequiredParams;

module.exports = (post) => {
    post('/lists/create', body => {
        return checkRequiredParams(Object.keys(body), ['title', 'boardId']) 
        .then(() => listsApi.create({ title: body.title }))
        .then(result => {
            const listId = result.id;
            return boardsApi.addList(body.boardId, listId)
            .then(() => { return { listId }; });
        });
    });

    post('/lists/remove', body => {
        return listsApi.remove(body.listId)
        .then(() => boardsApi.removeList(body.boardId, body.listId));
    });
};
