import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Card from 'server/models/Card';

const boardId = shortid.generate();
const listId = shortid.generate();
const commentId = shortid.generate();
const comment2Id = shortid.generate();
const cardId = shortid.generate();
const card2Id = shortid.generate();
const userId = shortid.generate();

describe('Card', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update card and return updated card', () => {
            return Card.update(cardId, { text: 'updated text' })
                .then(card => {
                    assert.property(card.activity, 'created_at');
                    delete card.activity.created_at;
                    assert.deepEqual(card, {
                        id: cardId,
                        text: 'updated text',
                        link: '/boards/' + boardId + '/cards/' + cardId,
                        activity: {
                            id: 1,
                            action: 'Updated',
                            type: 'card',
                            entry: {
                                title: 'updated text',
                                link: '/boards/' + boardId + '/cards/' + cardId
                            }
                        }
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop card entry', () => {
            return Card.drop(cardId)
                .then(() => {
                    return db.query(`SELECT id FROM cards WHERE id = $1`, [cardId]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped card id', () => {
            return Card.drop(cardId)
                .then(result => {
                    assert.equal(result.id, cardId);
                });
        });
    });

    describe('findById', () => {
        it('should return card with all relations', () => {
            return Card.findById(card2Id)
                .then(card => {
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
                        id: card2Id,
                        text: 'test card 2',
                        link: '/boards/' + boardId + '/cards/' + card2Id,
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
                });
        });
    });

    describe('createComment', () => {
        const commentData = {
            text: 'test comment'
        };

        it('should create comment', () => {
            return Card.createComment(userId, cardId, commentData)
                .then(comment => {
                    assert.property(comment, 'id');
                    assert.property(comment, 'created_at');
                    assert.deepEqual(_.omit(comment, ['id', 'created_at', 'user']), {
                        text: commentData.text
                    });

                    assert.property(comment.user, 'avatar');
                    assert.deepEqual(_.omit(comment.user, ['avatar']), {
                        id: userId,
                        username: 'testuser'
                    });
                });
        });

        it('should generate shortid', () => {
            return Card.createComment(userId, cardId, commentData).then(comment => {
                assert.isTrue(shortid.isValid(comment.id));
            });
        });

        it('should relate comment to card', () => {
            return Card.createComment(userId, cardId, commentData).then(comment => {
                return db.one(`SELECT card_id FROM cards_comments WHERE comment_id = $1`, [comment.id]);
            }).then(result => {
                assert.equal(result.card_id, cardId);
            });
        });

        it('should relate comment to user', () => {
            return Card.createComment(userId, cardId, commentData).then(comment => {
                return db.one(`SELECT user_id FROM users_comments WHERE comment_id = $1`, [comment.id]);
            }).then(result => {
                assert.equal(result.user_id, userId);
            });
        });
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
        INSERT INTO cards_comments VALUES ($3, $4);
        INSERT INTO cards_comments VALUES ($3, $5);
        INSERT INTO users_comments VALUES ($1, $4);
        INSERT INTO users_comments VALUES ($1, $5);
    `, [userId, cardId, card2Id, commentId, comment2Id, boardId, listId]);
};
