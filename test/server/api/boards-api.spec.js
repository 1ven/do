import chai, { assert, expect } from 'chai';
import boardsApi from 'server/api/boards-api';
import db from 'server/db';
import { recreateTables } from '../helpers';

describe('boards api', () => {
    beforeEach(recreateTables);

    describe('getFull', () => {
        it('should get full board by given id', () => {
            return db.none(`
                INSERT INTO boards (title, lists) values ('test board 1', NULL), ('test board 2', ARRAY[1,2]);
                INSERT INTO lists (title, cards) values ('test list 1', ARRAY[1]), ('test list 2', ARRAY[2]);
                INSERT INTO cards (text) values ('test card 1'), ('test card 2');
            `)
                .then(() => boardsApi.getFull(2))
                .then(fullBoard => {
                    const expected = {
                        id: 2,
                        title: 'test board 2',
                        lists: [
                            {
                                id: 1,
                                title: 'test list 1',
                                cards: [
                                    {
                                        id: 1,
                                        text: 'test card 1'
                                    }
                                ]
                            },
                            {
                                id: 2,
                                title: 'test list 2',
                                cards: [
                                    {
                                        id: 2,
                                        text: 'test card 2'
                                    }
                                ]
                            }
                        ],
                    };
                    assert.deepEqual(fullBoard, expected);
                });
        });

        it('should return then same board, when board has no lists', () => {
            return db.none("INSERT INTO boards (title) values ('test board')")
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
