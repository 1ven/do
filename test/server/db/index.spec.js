import { assert } from 'chai';
import fs from 'fs';
import db from 'server/db';

const createBoardsSql = fs.readFileSync('server/db/tables/boards.sql', 'utf8');
const createListsSql = fs.readFileSync('server/db/tables/lists.sql', 'utf8');
const createCardsSql = fs.readFileSync('server/db/tables/cards.sql', 'utf8');

describe('tables', ()=> {
    describe('boards', ()=> {
        beforeEach(()=> {
            return db.none('DROP TABLE IF EXISTS boards');
        });

        it('should be created', ()=> {
            return db.none(createBoardsSql)
                .then(()=> selectColumnsInfo('boards'))
                .then(result => {
                    const columns = prettyColumnsInfo(result);
                    assert.equal(columns.id, 'integer');
                    assert.equal(columns.title, 'text');
                    assert.equal(columns.lists, 'ARRAY');
                });
        });
    });

    describe('lists', ()=> {
        beforeEach(()=> {
            return db.none('DROP TABLE IF EXISTS lists');
        });

        it('should be created', ()=> {
            return db.none(createListsSql)
                .then(()=> selectColumnsInfo('lists'))
                .then(result => {
                    const columns = prettyColumnsInfo(result);
                    assert.equal(columns.id, 'integer');
                    assert.equal(columns.title, 'text');
                    assert.equal(columns.cards, 'ARRAY');
                });
        });
    });

    describe('cards', ()=> {
        beforeEach(()=> {
            return db.none('DROP TABLE IF EXISTS cards');
        });

        it('should be created', ()=> {
            return db.none(createCardsSql)
                .then(()=> selectColumnsInfo('cards'))
                .then(result => {
                    const columns = prettyColumnsInfo(result);
                    assert.equal(columns.id, 'integer');
                    assert.equal(columns.text, 'text');
                });
        });
    });

});

function prettyColumnsInfo(data) {
    return data.reduce((acc, row) => {
        acc[row.column_name] = row.data_type;
        return acc;
    }, {});
}

function selectColumnsInfo(table) {
    return db.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1
    `, table);
}
