import Promise from 'bluebird';
import db from 'server/db';
import { assert, expect } from 'chai';
import listsApi from 'server/api/lists-api';
import { recreateTables } from '../helpers';

describe('lists api', () => {
    beforeEach(recreateTables);

    describe('getFull', () => {
        it('should get full list by given id', () => {
            return db.none(`
                INSERT INTO lists (title, cards)
                    values ('test list 1', NULL), ('test list 2', ARRAY[1, 2, 3]), ('test list 3', NULL);
                INSERT INTO cards (text)
                    values ('test card 1'), ('test card 2'), ('test card 3');
            `)
                .then(() => listsApi.getFull(2))
                .then(list => {
                    const expected = {
                        id: 2,
                        title: 'test list 2',
                        cards: [
                            { id: 1, text: 'test card 1' },
                            { id: 2, text: 'test card 2' },
                            { id: 3, text: 'test card 3' }
                        ]
                    };
                    assert.deepEqual(list, expected);
                });
        });

        it('should return then same list, when list has no cards', () => {
            return db.none("INSERT INTO lists (title) values ('test list')")
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
