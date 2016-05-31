import { assert } from 'chai';
import Promise from 'bluebird';
import _ from 'lodash';
import db from 'server/db';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import Activity from 'server/models/Activity';

const boardId = shortid.generate();
const listId = shortid.generate();
const cardId = shortid.generate();

describe('Activity', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('create', () => {
        it('should create activity and return created entry', () => {
            return Activity.create(cardId, 'cards', 'Created')
                .then(entry => {
                    assert.property(entry, 'id');
                    assert.property(entry, 'created_at');
                    assert.deepEqual(_.omit(entry, ['id', 'created_at']), {
                        action: 'Created',
                        type: 'card',
                        entry: {
                            title: 'test card',
                            link: `/boards/${boardId}/cards/${cardId}`
                        }
                    });
                });
        });
    });

    describe('findLast', () => {
        it('should return last 15 activity entries', () => {
            return Activity.findLast().then(activity => {
                assert.lengthOf(activity, 15);
                assert.property(activity[0], 'created_at');
                assert.deepEqual(_.omit(activity[0], ['created_at']), {
                    id: 20,
                    action: 'Updated',
                    type: 'card',
                    entry: {
                        title: 'test card',
                        link: `/boards/${boardId}/cards/${cardId}`
                    }
                });
            });
        });
    });

    describe('_transformActivityItem', () => {
        it('should append to activity item corresponding entry data and remove entry_id, entry_table', () => {
            return db.one(`
                SELECT id, created_at, action, entry_id, entry_table
                FROM activity WHERE id = 1
            `).then(activityItem => {
                return Activity._transformActivityItem(activityItem);
            }).then(transformed => {
                assert.property(transformed, 'created_at');
                assert.deepEqual(_.omit(transformed, ['created_at']), {
                    id: 1,
                    action: 'Updated',
                    type: 'card',
                    entry: {
                        title: 'test card',
                        link: `/boards/${boardId}/cards/${cardId}`
                    }
                });
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO boards (id, title) VALUES ($1, 'test board');
        INSERT INTO lists (id, title) VALUES ($2, 'test list');
        INSERT INTO boards_lists VALUES ($1, $2);
        INSERT INTO cards (id, text) VALUES ($3, 'test card');
        INSERT INTO lists_cards VALUES ($2, $3);
    `, [boardId, listId, cardId]).then(() => {
        return Promise.each(_.range(20), (item, i) => {
            return new Promise((resolve, reject) => {
                const now = Math.floor(Date.now() / 1000 + i);
                db.none(`
                    INSERT INTO activity (created_at, entry_id, entry_table, action)
                    VALUES ($1, $2, 'cards', 'Updated')
                `, [now, cardId]).then(resolve, reject);
            });
        });
    });
}
