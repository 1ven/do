import Promise from 'bluebird';
import { assert, expect } from 'chai';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import { createLists, createCards, recreateTables } from '../helpers';

describe('lists api', () => {
    beforeEach(recreateTables);

    describe('getFull', () => {
        it('should get full list by given id', () => {
            return Promise.all([createLists(), createCards()])
            .then(() => listsApi.addCard(5, 4))
            .then(() => listsApi.addCard(5, 6))
            .then(() => listsApi.addCard(5, 9))
            .then(() => listsApi.getFull(5))
            .then(list => {
                const expected = {
                    id: 5,
                    title: 'lists entry 5',
                    cards: [
                        {id: 4, text: 'cards entry 4'},
                        {id: 6, text: 'cards entry 6'},
                        {id: 9, text: 'cards entry 9'}
                    ]
                };
                assert.deepEqual(list, expected);
            });
        });

        it('should return then same list, when list has no cards', () => {
            return listsApi.create({title: 'test list'})
            .then(() => listsApi.getFull(1))
            .then(fullList => {
                const expected = {
                    id: 1,
                    title: 'test list',
                    cards: null
                };
                assert.deepEqual(fullList, expected);
            });
        });
    });
});

