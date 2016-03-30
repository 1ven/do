import { assert } from 'chai';
import Promise from 'bluebird';
import db from 'server/db';
import _ from 'lodash';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import { recreateTables } from '../helpers';

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
                    id: 1,
                    title: boardTitle,
                    lists: null
                }
            };

            assert.deepEqual(body, expectedBody);

            db.one('SELECT * FROM boards WHERE id = $1', [body.data.id])
                .then(board => assert.equal(board.title, boardTitle))
                .then(done, done);
        });
    });

    it('/boards/remove should remove board', (done) => {
        const boardId = 2;

        db.none("INSERT INTO boards (title) values ('board 1'), ('board 2'), ('board 3')")
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
                        success: true
                    };

                    assert.deepEqual(body, expectedBody);

                    db.query('SELECT * FROM boards')
                        .then(boards => {
                            const boardsIds = _.map(boards, board => board.id);
                            assert.notInclude(boardsIds, boardId);
                        })
                        .then(done, done);
                });
            });
    });

    it('/boards/get-all should return all boards', (done)=> {
        db.none("INSERT INTO boards (title) values ('board 1'), ('board 2'), ('board 3')")
            .then(() => {
                request(app)
                .post('/boards/get-all')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    const body = res.body;

                    assert.equal(body.success, true);

                    const expected = [
                        {
                            id: 1,
                            title: 'board 1',
                            lists: null
                        },
                        {
                            id: 2,
                            title: 'board 2',
                            lists: null
                        },
                        {
                            id: 3,
                            title: 'board 3',
                            lists: null
                        }
                    ];

                    assert.deepEqual(body.data, expected);
                    done(err);
                });
            });
    });

    it('/boards/get-full should return full board', (done)=> {
        const boardId = 2;

        return db.none(`
            INSERT INTO boards (title, lists) values ('board 1', NULL), ('board 2', ARRAY[1,2]);
            INSERT INTO lists (title, cards) values ('list 1', ARRAY[1]), ('list 2', ARRAY[2]);
            INSERT INTO cards (text) values ('card 1'), ('card 2');
        `)
            .then(() => {
                request(app)
                .post('/boards/get-full')
                .send({
                    id: boardId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    const body = res.body;

                    assert.equal(body.success, true);

                    const expected = {
                        id: 2,
                        title: 'board 2',
                        lists: [
                            {
                                id: 1,
                                title: 'list 1',
                                cards: [
                                    {
                                        id: 1,
                                        text: 'card 1'
                                    }
                                ]
                            },
                            {
                                id: 2,
                                title: 'list 2',
                                cards: [
                                    {
                                        id: 2,
                                        text: 'card 2'
                                    }
                                ]
                            }
                        ]
                    };

                    assert.deepEqual(body.data, expected);
                    done(err);
                });
            });
    });
});
