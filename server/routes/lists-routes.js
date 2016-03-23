'use strict';

const boardsApi = require('../api/boards-api');
const listsApi = require('../api/lists-api');

module.exports = (post)=> {
    post('/lists/create', body => {
        return listsApi.create({ title: body.title })
        .then(result => boardsApi.addList(body.boardId, result.id));
    });
};
