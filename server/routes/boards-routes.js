'use strict';

const boardsApi = require('../api/boards-api');

module.exports = (post)=> {
    post('/boards/create', body => boardsApi.create({
        title: body.title
    }));

    post('/boards/remove', body => boardsApi.remove(body.id));

    post('/boards/get-full', body => boardsApi.getFull(body.id));

    post('/boards/get-all', body => boardsApi.getAll());
};
