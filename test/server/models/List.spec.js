import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import List from 'server/models/List';

const userId = shortid.generate();
const boardId = shortid.generate();
const listId = shortid.generate();

describe('List', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update list and return updated list', () => {
            return List.update(userId, listId, { title: 'updated title' })
                .then(list => {
                    assert.property(list, 'link');
                    assert.property(list.activity, 'created_at');
                    delete list.activity.created_at;
                    assert.deepEqual(_.omit(list, ['link']), {
                        id: listId,
                        title: 'updated title',
                        activity: {
                            id: 1,
                            action: 'Updated',
                            type: 'list',
                            entry: {
                                title: 'updated title',
                                link: '/boards/' + boardId + '/lists/' + listId
                            }
                        }
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop list entry', () => {
            return List.drop(listId)
                .then(() => {
                    return db.query(`SELECT id FROM lists WHERE id = $1`, [listId]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped list id', () => {
            return List.drop(listId)
                .then(result => {
                    assert.equal(result.id, listId);
                });
        });
    });

    describe('createCard', () => {
        const cardData = {
            text: 'test card'
        };

        it('should create card', () => {
            return List.createCard(userId, listId, cardData).then(card => {
                const link = '/boards/' + boardId + '/cards/' + card.id;

                assert.property(card, 'id');
                assert.property(card.activity, 'created_at');
                delete card.activity.created_at;
                assert.deepEqual(_.omit(card, ['id']), {
                    text: cardData.text,
                    board_id: boardId,
                    link, 
                    activity: {
                        id: 1,
                        action: 'Created',
                        type: 'card',
                        entry: {
                            title: cardData.text,
                            link
                        }
                    }
                });
            });
        });

        it('should generate shortid', () => {
            return List.createCard(userId, listId, cardData).then(card => {
                assert.isTrue(shortid.isValid(card.id));
            });
        });

        it('should relate card to list', () => {
            return List.createCard(userId, listId, cardData).then(card => {
                return db.one(`SELECT list_id FROM lists_cards WHERE card_id = $1`, [card.id]);
            }).then(result => {
                assert.equal(result.list_id, listId);
            });
        });
    });

    describe('archive', () => {
        it('should set `archive` flag to true', () => {
            return List.archive(listId)
                .then(() => {
                    return db.one(`SELECT archived FROM lists WHERE id = $1`, [listId]);
                })
                .then(result => {
                    assert.isTrue(result.archived);
                });
        });

        it('should return archived entry id', () => {
            return List.archive(listId)
                .then(result => {
                    assert.deepEqual(result, {
                        id: listId
                    });
                });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO users(id, username, email, hash, salt)
        VALUES ($3, 'test', 'test@test.com', 'hash', 'salt');
        INSERT INTO boards(id, title) VALUES ($1, 'test board');
        INSERT INTO lists(id, title) VALUES ($2, 'test list');
        INSERT INTO boards_lists VALUES ($1, $2)
    `, [boardId, listId, userId]);
};
