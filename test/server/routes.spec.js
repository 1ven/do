import { assert } from 'chai';
import request from 'supertest';
import db from 'server/db';
import { recreateTables } from './helpers';
import app from 'server/.';

describe('routes', () => {
    beforeEach(recreateTables);

    describe('boards routes', () => {
        it('GET /api/boards should respond with 200 and return all nested boards', (done) => {
            db.none(`
                INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => {
                request(app)
                    .get('/api/boards')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) { return done(err); }

                        assert.deepEqual(res.body, { result:
                            [
                                { id: 1, title: 'test board 1', lists: [] },
                                { id: 2, title: 'test board 2', lists: [] },
                                { id: 3, title: 'test board 3', lists: [] }
                            ]
                        });

                        done();
                    });
            });
        });

        it('GET /api/boards/:id should respond with 200 and return nested board by given id', (done) => {
            db.none(`
                INSERT INTO boards (title) VALUES
                ('test board 1')
            `).then(() => {
                request(app)
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

        it('GET /api/boards/:id should respond with 404, when board does not exist', (done) => {
            request(app)
                .get('/api/boards/1')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(done);
        });

        it('POST /api/boards should respond with 201 and return created board', (done) => {
            request(app)
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

                    done();
                });
        });

        it('POST /api/boards/:id/lists should respond with 201 and return created list', (done) => {
            db.none(`
                INSERT INTO boards (title) VALUES ('test board')
            `).then(() => {
                request(app)
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
                                title: 'test list',
                            }
                        });

                        done();
                    });
            });
        });

        it('POST /api/boards/:id/lists should respond with 404, when board does not exist', (done) => {
            request(app)
                .post('/api/boards/1/lists')
                .send({
                    title: 'test list'
                })
                .expect(404)
                .end(done);
        });

        it('DELETE /api/boards/:id should respond with 200 and return removed id', (done) => {
            db.none(`
                INSERT INTO boards (title) VALUES ('test board')
            `).then(() => {
                request(app)
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

        it('DELETE /api/boards/:id should respond with 404, when board does not exist', (done) => {
            request(app)
                .delete('/api/boards/1')
                .expect(404)
                .end(done);
        });

        it('PUT /api/boards/:id should respond with 200 and return updated board', (done) => {
            db.none(`
                INSERT INTO boards (title) VALUES ('test board')
            `).then(() => {
                request(app)
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
            });
        });

        it('PUT /api/boards/:id should respond with 404 when trying to update nonexistent board', (done) => {
            request(app)
                .put('/api/boards/1')
                .send({
                    title: 'new title'
                })
                .expect(404)
                .end(done);
        });
    });

    describe('lists routes', () => {
        it('POST /api/lists/:id/cards should respond with 201 and return created card', (done) => {
            db.none(`
                INSERT INTO lists (title) VALUES ('test list')
            `).then(() => {
                request(app)
                    .post('/api/lists/1/cards')
                    .send({
                        text: 'test card'
                    })
                    .expect(201)
                    .end((err, res) => {
                        if (err) { return done(err); }

                        assert.deepEqual(res.body, { result: { id: 1, text: 'test card' } });

                        done();
                    });
            });
        });

        it('POST /api/lists/:id/cards should respond with 404, when list does not exist', (done) => {
            request(app)
                .post('/api/lists/1/cards')
                .send({
                    text: 'test card'
                })
                .expect(404)
                .end(done);
        });

        it('DELETE /api/lists/:id should respond with 200 and return removed id', (done) => {
            db.none(`
                INSERT INTO lists (title) VALUES ('test list')
            `).then(() => {
                request(app)
                    .delete('/api/lists/1')
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

        it('DELETE /api/lists/:id should respond with 404, when list does not exist', (done) => {
            request(app)
                .delete('/api/lists/1')
                .expect(404)
                .end(done);
        });

        it('PUT /api/lists/:id should respond with 200 and return updated list', (done) => {
            db.none(`
                INSERT INTO lists (title) VALUES ('test list')
            `).then(() => {
                request(app)
                    .put('/api/lists/1')
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
            });
        });

        it('PUT /api/lists/:id should respond with 404 when trying to update nonexistent list', (done) => {
            request(app)
                .put('/api/lists/1')
                .send({
                    title: 'new title'
                })
                .expect(404)
                .end(done);
        });
    });

    describe('cards routes', () => {
        it('DELETE /api/cards/:id should respond with 200 and return removed id', (done) => {
            db.none(`
                INSERT INTO cards (text) VALUES ('test card')
            `).then(() => {
                request(app)
                    .delete('/api/cards/1')
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

        it('DELETE /api/cards/:id should respond with 404, when card does not exist', (done) => {
            request(app)
                .delete('/api/cards/1')
                .expect(404)
                .end(done);
        });

        it('PUT /api/cards/:id should respond with 200 and return updated card', (done) => {
            db.none(`
                INSERT INTO cards (text) VALUES ('test card')
            `).then(() => {
                request(app)
                    .put('/api/cards/1')
                    .send({
                        text: 'new text'
                    })
                    .expect(200)
                    .end((err, res) => {
                        if (err) { return done(err); }

                        assert.deepEqual(res.body, {
                            result: {
                                id: 1,
                                text: 'new text'
                            }
                        });

                        done();
                    });
            });
        });

        it('PUT /api/cards/:id should respond with 404 when trying to update nonexistent card', (done) => {
            request(app)
                .put('/api/cards/1')
                .send({
                    text: 'new text'
                })
                .expect(404)
                .end(done);
        });
    });

    describe('users routes', () => {
        it('POST /api/users should respond with 201 and return created user data', (done) => {
            request(app)
                .post('/api/users')
                .send({
                    username: 'test',
                    email: 'test@mail.com',
                    password: 123456,
                    rePassword: 123456
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: {
                            id: 1,
                            username: 'test'
                        }
                    });

                    done();
                });
        });
    });
});
