import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import cardsApi from 'server/api/cards-api';
import db from 'server/db';
import { sql } from 'server/helpers';
import { createBoards, createCards, createLists } from './helpers';

chai.use(chaiAsPromised);

describe('boards api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS boards, lists, cards')
            .then(() => db.query(sql('cards.sql')))
            .then(() => db.query(sql('lists.sql')))
            .then(() => db.query(sql('boards.sql')));
    });

    describe('addList', ()=> {
        it('should add list on the board', () => {
            return listsApi.create({title: 'test list'})
            .then(() => boardsApi.create({title: 'test board'}))
            .then(() => boardsApi.addList(1, 1))
            .then(() => db.one('SELECT * FROM boards'))
            .then(board => {
                assert.include(board.lists, 1);
            });
        });

        it('should not add nonexistent list on the board', () => {
            return boardsApi.create({title: 'test board'})
            .then(board => {
                const promise = boardsApi.addList(1, 5);
                return expect(promise).to.be.rejectedWith(/list does not exist/);
            });
        });
    });

    describe('removeList', () => {
        it('should remove list from the board', () => {
            return Promise.all([createBoards()], [createLists()])
            .then(() => boardsApi.addList(2, 1))
            .then(() => boardsApi.addList(2, 2))
            .then(() => boardsApi.addList(2, 3))
            .then(() => boardsApi.removeList(2, 2))
            .then(() => boardsApi.getById(2))
            .then(board => {
                assert.include(board.lists, 1);
                assert.notInclude(board.lists, 2);
                assert.include(board.lists, 3);
            });
        });
    });

    describe('getFull', () => {
        it('should get full board by given id', () => {
            return Promise.all(
                [createBoards()], [createLists()], [createCards()]
            )
            .then(() => db.query('select * from boards'))
            .then(result => console.log(result))
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
