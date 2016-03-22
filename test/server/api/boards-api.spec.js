import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import fs from 'fs';
import db from 'server/db';

chai.use(chaiAsPromised);

const createboardsSql = fs.readFileSync('server/db/tables/boards.sql', 'utf8');

describe('boards api', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS boards')
            .then(() => db.query(createboardsSql));
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
            return boardsApi.create({title: 'test board'})
            .then(() => boardsApi.create({title: 'test board 2'}))
            .then(() => boardsApi.create({title: 'test board 3'}))
            .then(() => listsApi.create({title: 'test list 1'}))
            .then(() => listsApi.create({title: 'test list 2'}))
            .then(() => listsApi.create({title: 'test list 3'}))
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
});
