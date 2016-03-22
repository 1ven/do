import { assert } from 'chai';
import cardsApi from 'server/api/cards-api';
import fs from 'fs';
import db from 'server/db';

const createCardsSql = fs.readFileSync('server/db/tables/cards.sql', 'utf8');

describe('cards api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS cards')
        .then(() => db.query(createCardsSql));
    });

    describe('getSome', () => {
        it('should return cards by given ids', () => {
            return cardsApi.create({text: 'test card 1'})
            .then(() => cardsApi.create({text: 'test card 2'}))
            .then(() => cardsApi.create({text: 'test card 3'}))
            .then(() => cardsApi.create({text: 'test card 4'}))
            .then(() => cardsApi.getSome([2, 3]))
            .then(cards => {
                const expected = [
                    { id: 2, text: 'test card 2' },
                    { id: 3, text: 'test card 3' }
                ];
                assert.deepEqual(cards, expected);
            });
        });
    });
});
