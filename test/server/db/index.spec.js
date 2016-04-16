import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db from 'server/db';
import { sql } from 'server/helpers';
import { recreateTables } from '../helpers';

chai.use(chaiAsPromised);

describe('tables', () => {
    beforeEach(recreateTables);

    describe('boards', () => {
        it('should be created', () => {
            return selectColumnsInfo('boards')
                .then(prettyColumnsInfo)
                .then(columns => {
                    assert.equal(columns.id, 'integer');
                    assert.equal(columns.title, 'text');
                });
        });
    });

    describe('boards_lists', () => {
        it('should be created', () => {
            return selectColumnsInfo('boards_lists')
                .then(prettyColumnsInfo)
                .then(columns => {
                    assert.equal(columns.board_id, 'integer');
                    assert.equal(columns.list_id, 'integer');
                });
        });

        it('should not remove `board` entry when board has lists inside', () => {
            const promise = db.query(`
                INSERT INTO boards VALUES (4, 'test board');
                INSERT INTO lists VALUES (7, 'test list');
                INSERT INTO boards_lists VALUES (4, 7);
                DELETE FROM boards WHERE id = 4;
            `);

            return assert.isRejected(promise, /violates foreign key constraint/);
        });

        it('should remove entry from `boards_lists` after corresponding list was removed', () => {
            return db.query(`
                INSERT INTO boards VALUES (4, 'test board');
                INSERT INTO lists VALUES (7, 'test list');
                INSERT INTO boards_lists VALUES (4, 7);
                DELETE FROM lists WHERE id = 7;
            `)
                .then(() => db.query('SELECT * FROM boards_lists'))
                .then(result => assert.lengthOf(result, 0));
        });
    });

    describe('lists_cards', () => {
        it('should be created', () => {
            return selectColumnsInfo('lists_cards')
                .then(prettyColumnsInfo)
                .then(columns => {
                    assert.equal(columns.list_id, 'integer');
                    assert.equal(columns.card_id, 'integer');
                });
        });

        it('should not remove `list` entry when list has cards inside', () => {
            const promise = db.query(`
                INSERT INTO lists VALUES (3, 'test list');
                INSERT INTO cards VALUES (8, 'test card');
                INSERT INTO lists_cards VALUES (3, 8);
                DELETE FROM lists WHERE id = 3;
            `);

            return assert.isRejected(promise, /violates foreign key constraint/);
        });

        it('should remove entry from `lists_cards` after corresponding card was removed', () => {
            return db.query(`
                INSERT INTO lists VALUES (3, 'test list');
                INSERT INTO cards VALUES (8, 'test card');
                INSERT INTO lists_cards VALUES (3, 8);
                DELETE FROM cards WHERE id = 8;
            `)
                .then(() => db.query('SELECT * FROM lists_cards'))
                .then(result => assert.lengthOf(result, 0));
        });
    });
    describe('lists', () => {
        it('should be created', () => {
            return selectColumnsInfo('lists')
                .then(prettyColumnsInfo)
                .then(columns => {
                    assert.equal(columns.id, 'integer');
                    assert.equal(columns.title, 'text');
                });
        });
    });

    describe('cards', () => {
        it('should be created', () => {
            return selectColumnsInfo('cards')
                .then(prettyColumnsInfo)
                .then(columns => {
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
