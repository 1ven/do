import { assert } from 'chai';
import cardsApi from 'server/api/cards-api';
import { sql } from 'server/helpers';
import db from 'server/db';
import { createCards } from './helpers';

describe('cards api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS cards')
        .then(() => db.query(sql('cards.sql')));
    });

    describe('getSome', () => {
        it('should return cards by given ids', () => {
            return createCards()
            .then(() => cardsApi.getSome([2, 3]))
            .then(cards => {
                const expected = [
                    { id: 2, text: 'cards entry 2' },
                    { id: 3, text: 'cards entry 3' }
                ];
                assert.deepEqual(cards, expected);
            });
        });
    });
});
