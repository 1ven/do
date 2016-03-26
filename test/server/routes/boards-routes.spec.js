import { assert } from 'chai';
import _ from 'lodash';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import { recreateTables, createBoards, createLists, createCards } from '../helpers';

describe('boards routes', ()=> {
    beforeEach(recreateTables);

    it('/boards/create should create board', (done) => {
        const boardTitle = 'test board';

        request(app)
        .post('/boards/create')
        .send({
            title: boardTitle
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) { done(err); }

            const body = res.body;
            const expectedBody = {
                success: true,
                data: {
                    id: 1
                }
            };

            assert.deepEqual(body, expectedBody);

            boardsApi.getById(body.data.id)
            .then(board => assert.equal(board.title, boardTitle))
            .then(done, done);
        });
    });

    it('/boards/remove should remove board', (done) => {
        const boardId = 7;

        createBoards()
        .then(() => {
            request(app)
            .post('/boards/remove')
            .send({
                id: boardId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); }

                const body = res.body;
                const expectedBody = {
                    'success': true
                };

                assert.deepEqual(body, expectedBody);

                boardsApi.getAll()
                .then(boards => {
                    const boardsIds = _.map(boards, board => board.id);
                    assert.notInclude(boardsIds, boardId);
                })
                .then(done, done);
            });
        });
    });

    it('/boards/get-all should return all boards', (done)=> {
        createBoards()
        .then(() => {
            request(app)
            .post('/boards/get-all')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); }

                const body = res.body;

                assert.equal(body.success, true);
                assert.lengthOf(body.data, 10);

                boardsApi.getAll()
                .then(expectedBoards => {
                    assert.deepEqual(body.data, expectedBoards);
                })
                .then(done, done);
            });
        });
    });

    it('/boards/get-full should return full board', (done)=> {
        const boardId = 4;

        return Promise.all(
            [createBoards()], [createLists()], [createCards()]
        )
        .then(() => boardsApi.addList(boardId, 3))
        .then(() => boardsApi.addList(boardId, 9))
        .then(() => listsApi.addCard(3, 5))
        .then(() => listsApi.addCard(3, 7))
        .then(() => {
            request(app)
            .post('/boards/get-full')
            .send({
                id: boardId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) { done(err); }

                const body = res.body;

                assert.equal(body.success, true);

                boardsApi.getFull(boardId)
                .then(expectedFullBoard => {
                    assert.deepEqual(body.data, expectedFullBoard);
                })
                .then(done, done);
            });
        });
    });
});
