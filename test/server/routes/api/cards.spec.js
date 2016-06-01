import { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables, authenticate } from '../../helpers';

const boardId = shortid.generate();
const listId = shortid.generate();
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

                    assert.property(card, 'activity');
                    assert.deepEqual(_.omit(card, ['activity']), {
                        id: card2Id,
                        board_id: boardId,
                        text: 'new text',
                        link: '/boards/' + boardId + '/cards/' + card2Id
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

                    assert.deepEqual(res.body.result, {
                        id: card2Id,
                        board_id: boardId
                    });

                    done();
                });
        }).catch(done);
    });

    it('GET /api/cards/:id should respond 200 and return card with all relations', (done) => {
        setup().then(request => {
            request
                .get(`/api/cards/${cardId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.property(card.comments[0], 'created_at');
                    assert.property(card.comments[1], 'created_at');
                    assert.property(card.comments[0].user, 'avatar');
                    assert.property(card.comments[1].user, 'avatar');

                    const _card = _.assign({}, card, {
                        comments: card.comments.map(comment => _.omit(_.assign({}, comment, {
                            user: _.omit(comment.user, ['avatar'])
                        }), ['created_at']))
                    });

                    assert.deepEqual(_card, {
                        id: cardId,
                        text: 'test card 1',
                        link: '/boards/' + boardId + '/cards/' + cardId,
                        board_id: boardId,
                        comments: [{
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
                        }]
                    });

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
                    assert.deepEqual(_.omit(comment, ['id', 'created_at', 'user']), {
                        text: 'test comment'
                    });

                    assert.property(comment.user, 'avatar');
                    assert.property(comment.user, 'id');
                    assert.deepEqual(_.omit(comment.user, ['avatar', 'id']), {
                        username: 'test'
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
        INSERT INTO boards (id, title) VALUES ($6, 'test board');
        INSERT INTO lists (id, title) VALUES ($7, 'test list');
        INSERT INTO boards_lists VALUES ($6, $7);
        INSERT INTO cards (id, text) VALUES ($2, 'test card 1');
        INSERT INTO cards (id, text) VALUES ($3, 'test card 2');
        INSERT INTO lists_cards VALUES ($7, $2);
        INSERT INTO lists_cards VALUES ($7, $3);
        INSERT INTO comments (id, text) VALUES ($4, 'test comment 1');
        INSERT INTO comments (id, text) VALUES ($5, 'test comment 2');
        INSERT INTO cards_comments VALUES ($2, $4);
        INSERT INTO cards_comments VALUES ($2, $5);
        INSERT INTO users_comments VALUES ($1, $4);
        INSERT INTO users_comments VALUES ($1, $5);
    `, [userId, cardId, card2Id, commentId, comment2Id, boardId, listId])
        .then(authenticate);
};
