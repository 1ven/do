import Promise from 'bluebird';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db from 'server/db';
import baseApi from 'server/api/base-api';
import _ from 'lodash';
import { createEntries } from '../helpers';

chai.use(chaiAsPromised);

const testApi1 = _.extend({}, baseApi, { table: 'test_1' });
const testApi2 = _.extend({}, baseApi, { table: 'test_2' });

function createTable(name) {
    return db.none(`CREATE TABLE ${name}(
        id SERIAL PRIMARY KEY,
        title text,
        items integer[]
    )`);
};

describe('base api', () => {
    beforeEach(() => {
        return db.query(`DROP TABLE IF EXISTS test_1, test_2`)
            .then(() =>
                db.tx(function() {
                    return this.batch(
                        [createTable('test_1'), createTable('test_2')]
                    );
                })
            );
    });

    describe('create', () => {
        it('should create entry', () => {
            return testApi1.create({ title: 'entry' })
                .then(() => db.one(`SELECT * FROM test_1`))
                .then(entry => {
                    assert.deepEqual(entry, {
                        id: 1,
                        title: 'entry',
                        items: null
                    });
                });
        });

        it('should return entry after create', () => {
            return testApi1.create({ title: 'entry 1' })
                .then(entry => {
                    assert.deepEqual(entry, {
                        id: 1,
                        title: 'entry 1',
                        items: null
                    });
                })
                .then(() => testApi1.create({ title: 'entry 2' }))
                .then(result => {
                    assert.deepEqual(result, {
                        id: 2,
                        title: 'entry 2',
                        items: null
                    });
                })
                .then(() => testApi1.create({ title: 'entry 3' }))
                .then(result => {
                    assert.deepEqual(result, {
                        id: 3,
                        title: 'entry 3',
                        items: null
                    });
                });
        });
    });

    describe('remove', () => {
        it('should remove entry', () => {
            return db.none("INSERT INTO test_1 (title) values ('entry 1'), ('entry 2'), ('entry 3')")
                .then(() => testApi1.remove(2))
                .then(() => db.query('SELECT * FROM test_1'))
                .then(result => {
                    const rows = result.reduce((acc, row) => {
                        acc[row.id] = row;
                        return acc;
                    }, {});

                    assert.property(rows, 1);
                    assert.notProperty(rows, 2);
                    assert.property(rows, 3);
                });
        });
    });

    describe('getAll', () => {
        it('should get all entries', () => {
            return db.none("INSERT INTO test_1 (title) values ('test 1'), ('test 2')")
                .then(() => db.query('SELECT * FROM test_1'))
                .then(result => {
                    const expected = [
                        {
                            id: 1,
                            title: 'test 1',
                            items: null
                        },
                        {
                            id: 2,
                            title: 'test 2',
                            items: null
                        }
                    ];
                    assert.deepEqual(result, expected);
                });
        });
    });

    describe('getById', () => {
        it('should get entry by id', () => {
            return db.none("INSERT INTO test_1 (title) values ('test 1'), ('test 2'), ('test 3')")
                .then(() => testApi1.getById(2))
                .then(entry => {
                    const expected = {
                        id: 2,
                        title: 'test 2',
                        items: null
                    };
                    assert.deepEqual(entry, expected);
                });
        });
    });

    describe('getSome', () => {
        it('should get entries by given ids', () => {
            return db.none("INSERT INTO test_1 (title) values ('test 1'), ('test 2'), ('test 3')")
                .then(() => testApi1.getSome([2, 3]))
                .then(entries => {
                    const expected = [
                        {
                            id: 2,
                            title: 'test 2',
                            items: null
                        },
                        {
                            id: 3,
                            title: 'test 3',
                            items: null
                        }
                    ];
                    assert.deepEqual(entries, expected);
                });
        });
    });

    describe('addIdToArray', ()=> {
        it('should add id to array', () => {
            return db.none(`
                INSERT INTO test_1 (title) values ('test 1'), ('test 2'), ('test 3');
                INSERT INTO test_2 (title) values ('test 1'), ('test 2'), ('test 3')
            `)
                .then(() => testApi1.addIdToArray('items', 2, 3, testApi2))
                .then(() => db.one('SELECT * from test_1 WHERE id = 2'))
                .then(entry => {
                    assert.include(entry.items, 3);
                });
        });

        it('should throw error, when trying to add item on nonexistent entry', () => {
            const promise = testApi1.addIdToArray('items', 3, 2, testApi2);
            return expect(promise).to.be.rejectedWith(/test_1 entry does not exist/);
        });

        it('should throw error, when trying to add nonexistent item to array', () => {
            return db.none("INSERT INTO test_1 (title) values ('test 1'), ('test 2'), ('test 3')")
                .then(entry => {
                    const promise = testApi1.addIdToArray('items', 2, 5, testApi2);
                    return expect(promise).to.be.rejectedWith(/test_2 entry does not exist/);
                });
        });
    });

    describe('removeIdFromArray', () => {
        it('should remove id from array', () => {
            return db.none(`
                INSERT INTO test_1 (title, items) values ('test 1', NULL), ('test 2', ARRAY[1, 2]);
                INSERT INTO test_2 (title) values ('test 1'), ('test 2');
            `)
                .then(() => testApi1.removeIdFromArray('items', 2, 1))
                .then(() => db.one('SELECT * FROM test_1 WHERE id = 2'))
                .then(entry => {
                    assert.notInclude(entry.items, 1);
                    assert.include(entry.items, 2);
                });
        });
    });
});
