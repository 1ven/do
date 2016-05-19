import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import List from 'server/models/List';

const boardData = {
    id: shortid.generate(),
    title: 'test board 1'
};

const listData = {
    id: shortid.generate(),
    title: 'test list 1'
};

const cardData = {
    id: shortid.generate(),
    text: 'test card'
};

describe('List', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update list and return updated list', () => {
            return List.update(listData.id, { title: 'updated title' })
                .then(list => {
                    assert.deepEqual(list, {
                        id: listData.id,
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop list entry', () => {
            return List.drop(listData.id)
                .then(() => {
                    return db.query(`SELECT id FROM lists WHERE id = $1`, [listData.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped list id', () => {
            return List.drop(listData.id)
                .then(result => {
                    assert.equal(result.id, listData.id);
                });
        });

        it('should remove relations', () => {
            return List.drop(listData.id)
                .then(() => {
                    return db.query(`SELECT list_id FROM boards_lists WHERE list_id = $1`, [listData.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });
    });

    describe('createCard', () => {
        it('should create card', () => {
            return List.createCard(listData.id, cardData).then(card => {
                assert.property(card, 'id');
                assert.equal(card.text, cardData.text);
                assert.lengthOf(_.keys(card), 2);
            });
        });

        it('should relate card to list', () => {
            return List.createCard(listData.id, cardData).then(card => {
                return db.one('SELECT list_id FROM lists_cards WHERE card_id = $1', [card.id]);
            }).then(result => {
                assert.equal(result.list_id, listData.id);
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO boards (id, title)
            VALUES ($1, $3);
        INSERT INTO lists (id, title)
            VALUES ($2, $4);
        INSERT INTO boards_lists
            VALUES ($1, $2);
    `, [boardData.id, listData.id, boardData.title, listData.title]);
};
