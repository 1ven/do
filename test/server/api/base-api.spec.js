import chai, { assert, expect } from 'chai';
import db from 'server/db';
import baseApi from 'server/api/base-api';

const table = 'test';
baseApi.table = table;

describe('base api', () => {
    beforeEach(() => {
        return db.query(`DROP TABLE IF EXISTS ${table}`)
        .then(() => db.query(`CREATE TABLE ${table}(
            id SERIAL PRIMARY KEY,
            title text
        )`));
    });

    describe('create', () => {
        it('should create entry', () => {
            return baseApi.create({title: 'test'})
            .then(() => db.one(`SELECT * FROM ${table}`))
            .then(entry => {
                assert.equal(entry.id, 1);
                assert.equal(entry.title, 'test');
            });
        });

        it('should return id after insert', () => {
            return baseApi.create({title: 'test entry 1'})
            .then(result => {
                assert.deepEqual(result, {id: 1});
            })
            .then(() => baseApi.create({title: 'test entry 2'}))
            .then(result => {
                assert.deepEqual(result, {id: 2});
            })
            .then(() => baseApi.create({title: 'test entry 3'}))
            .then(result => {
                assert.deepEqual(result, {id: 3});
            });
        });
    });

    describe('remove', () => {
        it('should remove entry', () => {
            return baseApi.create({title: 'test 1'})
            .then(() => baseApi.create({title: 'test 2'}))
            .then(() => baseApi.create({title: 'test 3'}))
            .then(() => baseApi.remove(2))
            .then(() => baseApi.getAll())
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
            return baseApi.create({title: 'one'})
            .then(() => baseApi.create({title: 'two'}))
            .then(() => baseApi.getAll())
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
            return baseApi.create({title: 'test 1'})
            .then(() => baseApi.create({title: 'test 2'}))
            .then(() => baseApi.create({title: 'test 3'}))
            .then(() => baseApi.getById(2))
            .then(entry => {
                assert.equal(entry.id, 2);
                assert.equal(entry.title, 'test 2');
            });
        });
    });
});
