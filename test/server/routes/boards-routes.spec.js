import { assert } from 'chai';
import db from 'server/db';
import { recreateTables, authenticate } from '../helpers';

describe('boards routes', () => {
    beforeEach(recreateTables);

    it('GET /api/boards should respond with 200 and return all nested boards, related to user', (done) => {
        setup().then(request => {
            request
                .get('/api/boards')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, { result:
                        [
                            {
                                id: 1,
                                title: 'test board 1',
                                lists: []
                            },
                            {
                                id: 3,
                                title: 'test board 3',
                                lists: []
                            },
                        ]
                    });

                    done();
                });
        }).catch(done);
    });

    it('GET /api/boards/:id should respond with 200 and return nested board by given id', (done) => {
        setup().then(request => {
            request
                .get('/api/boards/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, { result: { id: 1, title: 'test board 1', lists: [] } });

                    done();
                });
        });
    });

    it('GET /api/boards/:id should respond with 404, when trying to get foreign board', (done) => {
        setup().then(request => {
            request
                .get('/api/boards/8')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('GET /api/boards/:id should respond with 404, when board does not exist', (done) => {
        authenticate().then(request => {
            request
                .get('/api/boards/1')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('POST /api/boards should respond with 201, create board, related to user and return created board', (done) => {
        authenticate()
            .then(request => {
                request
                    .post('/api/boards')
                    .send({
                        title: 'test board 1'
                    })
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        if (err) { return done(err); }

                        assert.deepEqual(res.body, {
                            result: {
                                id: 1,
                                title: 'test board 1',
                            }
                        });

                        db.query('SELECT board_id FROM users_boards WHERE user_id = 1')
                            .then(result => result.map(item => item.board_id))
                            .then(ids => assert.include(ids, 1))
                            .then(done, done);
                    });
            });
    });

    it('POST /api/boards/:id/lists should respond with 201 and return created list', (done) => {
        setup().then(request => {
            request
                .post('/api/boards/1/lists')
                .send({
                    title: 'test list'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: {
                            id: 1,
                            title: 'test list'
                        }
                    });

                    done();
                });
        }).catch(done);
    });

    it('POST /api/boards/:id/lists should respond with 404 when trying to create list on foreign board', (done) => {
        setup().then(request => {
            request
                .post('/api/boards/8/lists')
                .send({
                    title: 'test list'
                })
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('POST /api/boards/:id/lists should respond with 404 when board does not exist', (done) => {
        authenticate().then(request => {
            request
                .post('/api/boards/1/lists')
                .send({
                    title: 'test list'
                })
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('DELETE /api/boards/:id should respond with 200 and return removed id', (done) => {
        setup().then(request => {
            request
                .delete('/api/boards/1')
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: {
                            id: 1
                        }
                    });

                    done();
                });
        });
    });

    it('DELETE /api/boards/:id should respond with 404, when trying to delete foreign board', (done) => {
        setup().then(request => {
            request
                .delete('/api/boards/8')
                .expect(404)
                .end(done)
        }).catch(done);
    });

    it('DELETE /api/boards/:id should respond with 404 when trying to delete nonexistent board', (done) => {
        authenticate().then(request => {
            request
                .delete('/api/boards/1')
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('PUT /api/boards/:id should update list, respond with 200 and return updated board', (done) => {
        setup().then(request => {
            request
                .put('/api/boards/1')
                .send({
                    title: 'new title'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: {
                            id: 1,
                            title: 'new title'
                        }
                    });

                    done();
                });
        }).catch(done);
    });

    it('PUT /api/boards/:id should respond with 404, when trying to update foreign board', (done) => {
        setup().then(request => {
            request
                .put('/api/boards/8')
                .send({
                    title: 'new title'
                })
                .expect(404)
                .end(done)
        }).catch(done);
    });

    it('PUT /api/boards/:id should respond with 404 when trying to update nonexistent board', (done) => {
        authenticate().then(request => {
            request
                .put('/api/boards/1')
                .send({
                    title: 'new title'
                })
                .expect(404)
                .end(done);
        }).catch(done);
    });
});

function setup() {
    return authenticate()
        .then(request => {
            return db.none(`
                INSERT INTO boards
                    VALUES (1, 'test board 1'), (3, 'test board 3'), (8, 'test board 8');
                INSERT INTO users_boards
                    VALUES (1, 1), (1, 3);
            `).then(() => request);
        });
};
