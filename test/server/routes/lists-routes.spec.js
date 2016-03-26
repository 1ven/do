import Promise from 'bluebird';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import { createBoards, createLists, handleEndRequest, recreateTables } from '../helpers';

chai.use(chaiAsPromised);

describe('lists routes', () => {
    beforeEach(recreateTables);

    it('/lists/create should create list and place it id on board', (done) => {
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

                assert.equal(res.body.success, true);

                const listId = res.body.data.listId;

                listsApi.getById(listId)
                .then(() => boardsApi.getById(boardId))
                .then(board => {
                    assert.include(board.lists, listId);
                })
                .then(done, done);
            });
        });
    });

    it('/lists/remove should remove list itself and remove it id from board', (done) => {
        const boardId = 5;
        const listId = 3;

        Promise.all([createBoards(), createLists()])
        .then(() => boardsApi.addList(boardId, listId))
        .then(() => boardsApi.addList(boardId, 4))
        .then(() => boardsApi.addList(boardId, 8))
        .then(() => { 
            request(app)
            .post('/lists/remove')
            .send({ boardId, listId })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((requestErr, res) => {
                if (requestErr) { done(requestErr); }

                assert.equal(res.body.success, true);

                boardsApi.getById(boardId)
                .then(board => {
                    assert.notInclude(board.lists, listId);
                    assert.include(board.lists, 4);
                    assert.include(board.lists, 8);
                })
                .then(() => {
                    const promise = listsApi.getById(listId);
                    return expect(promise).to.be.rejectedWith(/No data returned from the query/);

                })
                .then(done, done);
            });
        });
    });
});
