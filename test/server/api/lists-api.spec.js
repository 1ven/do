import { assert, expect } from 'chai';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import fs from 'fs';
import db from 'server/db';

const createListsSql = fs.readFileSync('server/db/tables/lists.sql', 'utf8');
const createCardsSql = fs.readFileSync('server/db/tables/cards.sql', 'utf8');

describe('lists api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS lists, cards')
        .then(() => db.query(createListsSql))
        .then(() => db.query(createCardsSql));
    });

    describe('addCard', () => {
        it('should add card on list', () => {
            return listsApi.create({title: 'test list 1'})
            .then(() => listsApi.create({title: 'test list 2'}))
            .then(() => cardsApi.create({text: 'test card 1'}))
            .then(() => cardsApi.create({text: 'test card 2'}))
            .then(() => listsApi.addCard(1, 2))
            .then(() => listsApi.getById(1))
            .then(list => {
                assert.notInclude(list.cards, 1);
                assert.include(list.cards, 2);
            });
        });

        it('should throw error, when trying to add nonexistent card on the list', () => {
            return listsApi.create({title: 'test list'})
            .then(() => {
                const promise = listsApi.addCard(1, 8);
                return expect(promise).to.be.rejectedWith(/card does not exist/);
            });
        });
    });

    describe('removeCard', () => {
        it('should removeCard from list', () => {
            return listsApi.create({title: 'test list 1'})
            .then(() => listsApi.create({title: 'test list 2'}))
            .then(() => listsApi.create({title: 'test list 3'}))
            .then(() => cardsApi.create({text: 'test card 2'}))
            .then(() => cardsApi.create({text: 'test card 2'}))
            .then(() => cardsApi.create({text: 'test card 3'}))
            .then(() => listsApi.addCard(2, 1))
            .then(() => listsApi.addCard(2, 2))
            .then(() => listsApi.addCard(2, 3))
            .then(() => listsApi.removeCard(2, 2))
            .then(() => listsApi.getById(2))
            .then(list => {
                assert.include(list.cards, 1);
                assert.notInclude(list.cards, 2);
                assert.include(list.cards, 1);
            });
        });
    });
});

