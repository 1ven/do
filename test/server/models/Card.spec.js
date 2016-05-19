import { assert } from 'chai';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Card from 'server/models/Card';

const listData = {
    id: shortid.generate(),
    title: 'test list 1'
};

const cardData = {
    id: shortid.generate(),
    text: 'test card 1'
};

describe('Card', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update card and return updated card', () => {
            return Card.update(cardData.id, { text: 'updated text' })
                .then(card => {
                    assert.deepEqual(card, {
                        id: cardData.id,
                        text: 'updated text'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop card entry', () => {
            return Card.drop(cardData.id)
                .then(() => {
                    return db.query(`SELECT id FROM cards WHERE id = $1`, [cardData.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped card id', () => {
            return Card.drop(cardData.id)
                .then(result => {
                    assert.equal(result.id, cardData.id);
                });
        });

        it('should remove relations', () => {
            return Card.drop(cardData.id)
                .then(() => {
                    return db.query(`SELECT card_id FROM lists_cards WHERE card_id = $1`, [cardData.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO lists (id, title)
            VALUES ($1, $3);
        INSERT INTO cards (id, text)
            VALUES ($2, $4);
        INSERT INTO lists_cards
            VALUES ($1, $2);
    `, [listData.id, cardData.id, listData.title, cardData.text]);
};
