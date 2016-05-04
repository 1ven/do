import { assert } from 'chai';
import db from 'server/db';
import { recreateTables, authenticate } from '../helpers';

describe('cards routes', () => {
    beforeEach(recreateTables);

    it('DELETE /api/cards/:id should respond with 200 and return removed id', (done) => {
        setup().then(request => {
            request
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

    it('DELETE /api/cards/:id should respond with 404, when trying to delete foreign card', (done) => {
        setup().then(request => {
            request
                .delete('/api/cards/15')
                .expect(404)
                .end(done)
        }).catch(done);
    });

    it('DELETE /api/cards/:id should respond with 404 when trying to delete nonexistent card', (done) => {
        authenticate().then(request => {
            request
                .delete('/api/cards/1')
                .expect(404)
                .end(done);
        }).catch(done);
    });

    it('PUT /api/cards/:id should update card, respond with 200 and return updated card', (done) => {
        setup().then(request => {
            request
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
        }).catch(done);
    });

    it('PUT /api/cards/:id should respond with 404, when trying to update foreign card', (done) => {
        setup().then(request => {
            request
                .put('/api/cards/15')
                .send({
                    text: 'new text'
                })
                .expect(404)
                .end(done)
        }).catch(done);
    });

    it('PUT /api/cards/:id should respond with 404 when trying to update nonexistent card', (done) => {
        authenticate().then(request => {
            request
                .put('/api/cards/1')
                .send({
                    text: 'new text'
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
                INSERT INTO lists (title)
                    VALUES ('test list 1'), ('test list 2');
                INSERT INTO boards_lists
                    VALUES (2, 1);
                INSERT INTO cards
                    VALUES (1, 'test card 1'), (15, 'test card 15');
                INSERT INTO lists_cards
                    VALUES (1, 1);
            `).then(() => request);
        });
};
