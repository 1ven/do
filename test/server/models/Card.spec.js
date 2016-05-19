import { assert } from 'chai';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Card from 'server/models/Card';

describe('Card', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update card and return updated card', () => {
            return Card.update('1', { text: 'updated text' })
                .then(card => {
                    assert.deepEqual(card, {
                        id: '1',
                        text: 'updated text'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop card entry', () => {
            return Card.drop('1')
                .then(() => {
                    return db.query(`SELECT id FROM cards WHERE id = '1'`);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped card id', () => {
            return Card.drop('1')
                .then(result => {
                    assert.equal(result.id, '1');
                });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO cards (id, text) VALUES ('1', 'test card 1');
    `);
};
