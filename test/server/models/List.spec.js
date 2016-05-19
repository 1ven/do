import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import List from 'server/models/List';

describe('List', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update list and return updated list', () => {
            return List.update('1', { title: 'updated title' })
                .then(list => {
                    assert.deepEqual(list, {
                        id: '1',
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop list entry', () => {
            return List.drop('1')
                .then(() => {
                    return db.query(`SELECT id FROM lists WHERE id = '1'`);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped list id', () => {
            return List.drop('1')
                .then(result => {
                    assert.equal(result.id, '1');
                });
        });
    });

    describe('createCard', () => {
        const cardData = {
            text: 'test card'
        };

        it('should create card', () => {
            return List.createCard('1', cardData).then(card => {
                assert.equal(card.text, cardData.text);
            });
        });

        it('should generate shortid', () => {
            return List.createCard('1', cardData).then(card => {
                assert.isTrue(shortid.isValid(card.id));
            });
        });

        it('should relate card to list', () => {
            return List.createCard('1', cardData).then(card => {
                return db.one(`SELECT list_id FROM lists_cards WHERE card_id = $1`, [card.id]);
            }).then(result => {
                assert.equal(result.list_id, '1');
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO lists(id, title) VALUES ('1', 'test list')
    `);
};
