import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const commentId = shortid.generate();
const comment2Id = shortid.generate();
const cardId = shortid.generate();
const card2Id = shortid.generate();
const userId = shortid.generate();

describe('cards routes', () => {
    beforeEach(recreateTables);

    it('PUT /api/cards/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/cards/${card2Id}`)
                .send({
                    text: 'new text'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.deepEqual(card, {
                        id: card2Id,
                        text: 'new text'
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/cards/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/cards/${card2Id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const id = res.body.result.id;

                    assert.equal(id, card2Id);

                    done();
                });
        }).catch(done);
    });

    it('GET /api/cards/:id/comments should respond 200 and return comments for specific card', (done) => {
        setup().then(request => {
            request
                .get(`/api/cards/${cardId}/comments`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const comments = res.body.result.map(c => _.omit(c, ['created_at']));

                    assert.deepEqual(comments, [{
                        id: commentId,
                        text: 'test comment 1',
                        user: {
                            id: userId,
                            username: 'testuser'
                        }
                    }, {
                        id: comment2Id,
                        text: 'test comment 2',
                        user: {
                            id: userId,
                            username: 'testuser'
                        }
                    }]);

                    done();
                });
        }).catch(done);
    });

    it('POST /api/cards/:id/comments should respond with 201', (done) => {
        setup().then(request => {
            request
                .post(`/api/cards/${cardId}/comments`)
                .send({
                    text: 'test comment'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const comment = res.body.result;

                    assert.property(comment, 'id');
                    assert.property(comment, 'created_at');
                    assert.deepEqual(_.omit(comment, ['id', 'created_at']), {
                        text: 'test comment'
                    });

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return db.none(`
        INSERT INTO users (id, username, email, hash, salt)
            VALUES ($1, 'testuser', 'testuser@test.com', 'hash', 'salt');
        INSERT INTO cards (id, text) VALUES ($2, 'test card 1');
        INSERT INTO cards (id, text) VALUES ($3, 'test card 2');
        INSERT INTO comments (id, text) VALUES ($4, 'test comment 1');
        INSERT INTO comments (id, text) VALUES ($5, 'test comment 2');
        INSERT INTO cards_comments VALUES ($2, $4);
        INSERT INTO cards_comments VALUES ($2, $5);
        INSERT INTO users_comments VALUES ($1, $4);
        INSERT INTO users_comments VALUES ($1, $5);
    `, [userId, cardId, card2Id, commentId, comment2Id])
        .then(authenticate);
};
