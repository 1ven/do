import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Card from 'server/models/Card';

const cardId = shortid.generate();
const userId = shortid.generate();

describe('Card', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update card and return updated card', () => {
            return Card.update(cardId, { text: 'updated text' })
                .then(card => {
                    assert.deepEqual(card, {
                        id: cardId,
                        text: 'updated text'
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

    describe('createComment', () => {
        const commentData = {
            text: 'test comment'
        };

        it('should create comment', () => {
            return Card.createComment(userId, cardId, commentData)
                .then(comment => {
                    assert.property(comment, 'id');
                    assert.property(comment, 'created_at');

                    assert.deepEqual(_.omit(comment, ['id', 'created_at']), {
                        text: commentData.text
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
        INSERT INTO cards (id, text) VALUES ($2, 'test card 1');
    `, [userId, cardId]);
};
