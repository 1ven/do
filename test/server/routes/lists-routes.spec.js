import { assert } from 'chai';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import { createBoards, handleEndRequest, recreateTables } from '../helpers';

describe('lists routes', () => {
    beforeEach(recreateTables);

    it('/lists/create should create list and place it on board', (done) => {
        const boardId = 6;

        createBoards()
        .then(() => {
            request(app)
            .post('/lists/create')
            .set('Accept', 'application/json')
            .send({
                title: 'test',
                boardId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((requestErr, res) => {
                if (requestErr) { done(requestErr); }

                const listId = res.body.data.listId;

                listsApi.getById(listId)
                .then(() => boardsApi.getById(boardId))
                .then(board => {
                    assert.include(board.lists, listId);
                })
                .then(done, err => done(err));
            });
        });
    });

    // it('/lists/remove should respond with json', (done) => {
    //     boardsApi.create({ title: 'test board' })
    //     .then(() => listsApi.create({ title: 'test list' }))
    //     .then(() => boardsApi.addList(1, 1))
    //     .then(() => { 
    //         return request(app)
    //         .post('/lists/remove')
    //         .send({
    //             boardId: 1,
    //             listId: 1
    //         })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(handleEndRequest.bind(null, { success: true }, done));
    //     });
    // });
});
