'use strict';

const boardsApi = require('../api/boards-api');
const listsApi = require('../api/lists-api');

module.exports = (post) => {
    post('/lists/create', body => {
        return listsApi.create({ title: body.title })
        .then(result => {
            const listId = result.id;
            return boardsApi.addList(body.boardId, listId)
            .then(() => { return { listId }; });
        });
    });

    // post('/lists/remove', body => {
    //     return listsApi.remove(body.listId)
    //     .then(() => boardsApi.removeList(body.boardId, body.listId));
    // });
};
