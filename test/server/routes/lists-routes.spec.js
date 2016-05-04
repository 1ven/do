import { assert } from 'chai';
import db from 'server/db';
import { recreateTables, authenticate } from '../helpers';

describe('lists routes', () => {
    beforeEach(recreateTables);

    it('POST /api/lists/:id/cards should respond with 201 and return created card', (done) => {
        setup().then(request => {
            request
                .post('/api/lists/1/cards')
                .send({
                    text: 'test card'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    assert.deepEqual(res.body, {
                        result: {
                            id: 1,
                            text: 'test card'
                        }
                    });

                    done();
                });
        }).catch(done);
    });

    it('POST /api/lists/:id/cards should respond with 404 when trying to create card on foreign list', (done) => {
        setup().then(request => {
            request
                .post('/api/lists/22/cards')
                .send({
                    text: 'test card'
                })
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('POST /api/lists/:id/cards should respond with 404 when list does not exist', (done) => {
        authenticate().then(request => {
            request
                .post('/api/lists/1/cards')
                .send({
                    text: 'test card'
                })
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('DELETE /api/lists/:id should respond with 200 and return removed id', (done) => {
        setup().then(request => {
            request
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

    it('DELETE /api/lists/:id should respond with 404, when trying to delete foreign list', (done) => {
        setup().then(request => {
            request
                .delete('/api/lists/22')
                .expect(404)
                .end(done)
        }).catch(done);
    });

    it('DELETE /api/lists/:id should respond with 404 when trying to delete nonexistent list', (done) => {
        authenticate().then(request => {
            request
                .delete('/api/lists/1')
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('PUT /api/lists/:id should update card, respond with 200 and return updated list', (done) => {
        setup().then(request => {
            request
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
        }).catch(done);
    });

    it('PUT /api/lists/:id should respond with 404, when trying to update foreign list', (done) => {
        setup().then(request => {
            request
                .put('/api/lists/22')
                .send({
                    text: 'new text'
                })
                .expect(404)
                .end(done)
        }).catch(done);
    });


    it('PUT /api/lists/:id should respond with 404 when trying to update nonexistent list', (done) => {
        authenticate().then(request => {
            request
                .put('/api/lists/1')
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
                INSERT INTO boards (title)
                    VALUES ('test board 1'), ('test board 2');
                INSERT INTO users_boards
                    VALUES (1, 2);
                INSERT INTO lists
                    VALUES (1, 'test list 1'), (22, 'test list 22');
                INSERT INTO boards_lists
                    VALUES (2, 1);
            `).then(() => request);
        });
};
