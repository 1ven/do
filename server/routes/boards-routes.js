'use strict';

const boardsApi = require('../api/boards-api');

module.exports = (post)=> {
    post('/boards/create', body => {
        const title = body.title;
        return boardsApi.create({ title });
    }, ['title']);

    post('/boards/remove', body => {
        const id = body.id;
        return boardsApi.remove(id);
    }, ['id']);

    post('/boards/get-full', body => {
        const id = body.id;
        return boardsApi.getFull(id);
    }, ['id']);

    post('/boards/get-all', body => {
        return boardsApi.getAll();
    });
};
