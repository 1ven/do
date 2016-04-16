import { assert } from 'chai';
import request from 'supertest';
import db from 'server/db';
import { recreateTables } from './helpers';
import app from 'server/.';

describe('routes', () => {
    beforeEach(recreateTables);

    it('GET /boards should respond with 200 and return all nested boards', (done) => {
        db.none(`
            INSERT INTO boards (title) VALUES
            ('test board 1'), ('test board 2'), ('test board 3')
        `).then(() => {
            request(app)
                .get('/boards')
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

    it('GET /boards/:id should respond with 200 and return nested board by given id', (done) => {
        db.none(`
            INSERT INTO boards (title) VALUES
            ('test board 1')
        `).then(() => {
            request(app)
                .get('/boards/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, { result: { id: 1, title: 'test board 1', lists: [] } });

                    done();
                });
        });
    });

    it('POST /boards should respond with 201 and return created board', (done) => {
        request(app)
            .post('/boards')
            .send({
                title: 'test board 1'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) { return done(err); }

                assert.deepEqual(res.body, { result: { id: 1, title: 'test board 1' } });

                done();
            });
    });

    it('POST /boards/:id/lists should respond with 201 and return created list', (done) => {
        db.none(`
            INSERT INTO boards (title) VALUES ('test board')
        `).then(() => {
            request(app)
                .post('/boards/1/lists')
                .send({
                    title: 'test list'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, { result: { id: 1, title: 'test list' } });

                    done();
                });
        });
    });

    it('DELETE /boards/:id should respond with 204', (done) => {
        db.none(`
            INSERT INTO boards (title) VALUES ('test board')
        `).then(() => {
            request(app)
                .delete('/boards/1')
                .expect(204)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {});

                    done();
                });
        });
    });

    it('DELETE /boards/:id should be idempotent', (done) => {
        request(app)
            .delete('/boards/20')
            .expect(204)
            .end(done);
    });

    it('POST /lists/:id/cards should respond with 201 and return created card', (done) => {
        db.none(`
            INSERT INTO lists (title) VALUES ('test list')
        `).then(() => {
            request(app)
                .post('/lists/1/cards')
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

    it('DELETE /lists/:id should respond with 204', (done) => {
        db.none(`
            INSERT INTO lists (title) VALUES ('test list')
        `).then(() => {
            request(app)
                .delete('/lists/1')
                .expect(204)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {});

                    done();
                });
        });
    });

    it('DELETE /lists/:id should be idempotent', (done) => {
        request(app)
            .delete('/lists/5')
            .expect(204)
            .end(done);
    });

    it('DELETE /cards/:id should respond with 204', (done) => {
        db.none(`
            INSERT INTO cards (text) VALUES ('test card')
        `).then(() => {
            request(app)
                .delete('/cards/1')
                .expect(204)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {});

                    done();
                });
        });
    });

    it('DELETE /cards/:id should be idempotent', (done) => {
        request(app)
            .delete('/cards/7')
            .expect(204)
            .end(done);
    });
});
