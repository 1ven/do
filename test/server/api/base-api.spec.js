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

const createTestApi1Entries = createEntries(testApi1);
const createTestApi2Entries = createEntries(testApi2);

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
        .then(() => db.tx(function() {
            return this.batch(
                [createTable('test_1'), createTable('test_2')]
            );
        }));
    });

    describe('create', () => {
        it('should create entry', () => {
            return testApi1.create({title: 'test'})
            .then(() => db.one(`SELECT * FROM test_1`))
            .then(entry => {
                assert.equal(entry.id, 1);
                assert.equal(entry.title, 'test');
            });
        });

        it('should return id after insert', () => {
            return testApi1.create({title: 'test entry 1'})
            .then(result => {
                assert.deepEqual(result, {id: 1});
            })
            .then(() => testApi1.create({title: 'test entry 2'}))
            .then(result => {
                assert.deepEqual(result, {id: 2});
            })
            .then(() => testApi1.create({title: 'test entry 3'}))
            .then(result => {
                assert.deepEqual(result, {id: 3});
            });
        });
    });

    describe('remove', () => {
        it('should remove entry', () => {
            return testApi1.create({title: 'test 1'})
            .then(() => testApi1.create({title: 'test 2'}))
            .then(() => testApi1.create({title: 'test 3'}))
            .then(() => testApi1.remove(2))
            .then(() => testApi1.getAll())
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
            return testApi1.create({title: 'one'})
            .then(() => testApi1.create({title: 'two'}))
            .then(() => testApi1.getAll())
            .then(result => {
                assert.equal(result.length, 2);
                assert.equal(result[0].id, 1);
                assert.equal(result[0].title, 'one');
                assert.equal(result[1].id, 2);
                assert.equal(result[1].title, 'two');
            });
        });
    });

    describe('getById', () => {
        it('should get entry by id', () => {
            return testApi1.create({title: 'test 1'})
            .then(() => testApi1.create({title: 'test 2'}))
            .then(() => testApi1.create({title: 'test 3'}))
            .then(() => testApi1.getById(2))
            .then(entry => {
                assert.equal(entry.id, 2);
                assert.equal(entry.title, 'test 2');
            });
        });
    });

    describe('getSome', () => {
        it('should get entries by given ids', () => {
            return testApi1.create({title: 'test 1'})
            .then(() => testApi1.create({title: 'test 2'}))
            .then(() => testApi1.create({title: 'test 3'}))
            .then(() => testApi1.getSome([2, 3]))
            .then(entries => {
                const expected = [
                    { id: 2, title: 'test 2', items: null },
                    { id: 3, title: 'test 3', items: null }
                ];
                assert.deepEqual(entries, expected);
            });
        });
    });

    describe('addIdToArray', ()=> {
        it('should add id to array', () => {
            return Promise.all([createTestApi1Entries(), createTestApi2Entries()])
            .then(() => testApi1.addIdToArray('items', 5, 3, testApi2))
            .then(() => testApi1.getById(5))
            .then(entry => {
                assert.include(entry.items, 3);
            });
        });

        it('should throw error, when trying to add item on nonexistent entry', () => {
            return createTestApi2Entries()
            .then(entry => {
                const promise = testApi1.addIdToArray('items', 3, 5, testApi2);
                return expect(promise).to.be.rejectedWith(/test_1 entry does not exist/);
            });
        });

        it('should throw error, when trying to add nonexistent item to array', () => {
            return createTestApi1Entries()
            .then(entry => {
                const promise = testApi1.addIdToArray('items', 3, 5, testApi2);
                return expect(promise).to.be.rejectedWith(/test_2 entry does not exist/);
            });
        });
    });

    describe('removeIdFromArray', () => {
        it('should remove id from array', () => {
            return Promise.all([createTestApi1Entries(), createTestApi2Entries()])
            .then(() => testApi1.addIdToArray('items', 5, 3, testApi2))
            .then(() => testApi1.addIdToArray('items', 5, 7, testApi2))
            .then(() => testApi1.addIdToArray('items', 5, 9, testApi2))
            .then(() => testApi1.removeIdFromArray('items', 5, 7))
            .then(() => testApi1.getById(5))
            .then(entry => {
                assert.include(entry.items, 3);
                assert.notInclude(entry.items, 7);
                assert.include(entry.items, 9);
            });
        });
    });

});
