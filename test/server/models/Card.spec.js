import { assert } from 'chai';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Card from 'server/models/Card';

const setup = require('../helpers').setup();
const _card = setup.data.cards[0];

describe('Card', () => {
    beforeEach(() => recreateTables().then(setup.create));

    describe('update', () => {
        it('should update card and return updated card', () => {
            return Card.update(_card.id, { text: 'updated text' })
                .then(card => {
                    assert.deepEqual(card, {
                        id: _card.id,
                        text: 'updated text'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop card entry', () => {
            return Card.drop(_card.id)
                .then(() => {
                    return db.query(`SELECT id FROM cards WHERE id = $1`, [_card.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped card id', () => {
            return Card.drop(_card.id)
                .then(result => {
                    assert.equal(result.id, _card.id);
                });
        });

        it('should remove relations', () => {
            return Card.drop(_card.id)
                .then(() => {
                    return db.query(`SELECT card_id FROM lists_cards WHERE card_id = $1`, [_card.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });
    });
});
