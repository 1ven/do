import chai, { assert, expect } from 'chai';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import db from 'server/db';
import { createBoards, createCards, createLists, recreateTables } from '../helpers';

describe('boards api', () => {
    beforeEach(recreateTables);

    describe('getFull', () => {
        it('should get full board by given id', () => {
            return Promise.all(
                [createBoards()], [createLists()], [createCards()]
            )
            .then(() => db.query('select * from boards'))
            .then(() => boardsApi.addList(7, 4))
            .then(() => boardsApi.addList(7, 6))
            .then(() => listsApi.addCard(4, 3))
            .then(() => listsApi.addCard(4, 5))
            .then(() => boardsApi.getFull(7))
            .then(fullBoard => {
                const expected = {
                    id: 7,
                    title: 'boards entry 7',
                    lists: [
                        {
                            id: 4,
                            title: 'lists entry 4',
                            cards: [
                                {
                                    id: 3,
                                    text: 'cards entry 3'
                                },
                                {
                                    id: 5,
                                    text: 'cards entry 5'
                                }
                            ]
                        },
                        {
                            id: 6,
                            title: 'lists entry 6',
                            cards: null
                        }
                    ],
                };
                assert.deepEqual(fullBoard, expected);
            });
        });

        it('should return then same board, when board has no lists', () => {
            return boardsApi.create({title: 'test board'})
            .then(() => boardsApi.getFull(1))
            .then(fullBoard => {
                const expected = {
                    id: 1,
                    title: 'test board',
                    lists: null
                };
                assert.deepEqual(fullBoard, expected);
            });
        });
    });
});
