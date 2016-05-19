import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import List from 'server/models/List';

const setup = require('../helpers').setup();

const _list = setup.data.lists[0];
const _board = setup.data.boards[0];

describe('List', () => {
    beforeEach(() => recreateTables().then(setup.create));

    describe('update', () => {
        it('should update list and return updated list', () => {
            return List.update(_list.id, { title: 'updated title' })
                .then(list => {
                    assert.deepEqual(list, {
                        id: _list.id,
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop list entry', () => {
            return List.drop(_list.id)
                .then(() => {
                    return db.query(`SELECT id FROM lists WHERE id = $1`, [_list.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped list id', () => {
            return List.drop(_list.id)
                .then(result => {
                    assert.equal(result.id, _list.id);
                });
        });

        it('should remove relations', () => {
            return List.drop(_list.id)
                .then(() => {
                    return db.query(`SELECT list_id FROM boards_lists WHERE list_id = $1`, [_list.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });
    });

    describe('createCard', () => {
        const cardData = {
            id: shortid.generate(),
            text: 'test card'
        };

        it('should create card', () => {
            return List.createCard(_list.id, cardData).then(card => {
                assert.property(card, 'id');
                assert.equal(card.text, 'test card');
                assert.lengthOf(_.keys(card), 2);
            });
        });

        it('should relate card to list', () => {
            return List.createCard(_list.id, cardData).then(card => {
                return db.one('SELECT list_id FROM lists_cards WHERE card_id = $1', [card.id]);
            }).then(result => {
                assert.equal(result.list_id, _list.id);
            });
        });
    });
});
