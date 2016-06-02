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

    describe('create', () => {
        const listData = {
            title: 'test list'
        };

        it('should create list', () => {
            return List.create(userId, boardId, listData).then(list => {
                assert.property(list, 'id');
                assert.property(list.activity, 'created_at');

                delete list.activity.created_at;

                assert.deepEqual(_.omit(list, ['id']), {
                    title: listData.title,
                    link: '/boards/' + boardId + '/lists/' + list.id,
                    activity: {
                        id: 1,
                        action: 'Created',
                        type: 'list',
                        entry: {
                            title: listData.title,
                            link: '/boards/' + boardId + '/lists/' + list.id
                        }
                    }
                });
            });
        });

        it('should relate list to board', () => {
            return List.create(userId, boardId, listData).then(list => {
                return db.one('SELECT board_id FROM boards_lists WHERE list_id = $1', [list.id]);
            }).then(result => {
                assert.equal(result.board_id, boardId);
            });
        });

        it('should generate shortid', () => {
            return List.create(userId, boardId, listData).then(list => {
                assert.isTrue(shortid.isValid(list.id));
            });
        });
    });

    describe('update', () => {
        it('should update list and return updated list with id, activity and updated fields', () => {
            return List.update(userId, listId, { title: 'updated title' })
                .then(list => {
                    assert.property(list.activity, 'created_at');
                    delete list.activity.created_at;
                    assert.deepEqual(list, {
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
