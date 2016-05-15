import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import Board from 'server/models/Board';

chai.use(chaiAsPromised);

describe('Board', () => {
    it('should create board and return created entry', () => {
        const title = 'test board';
        return Board.create({ title })
            .then(board => {
                const _board = board.toJSON();
                assert.deepEqual(_board.title, title);
            });
    });

    it('should generate valid shortid', () => {
        return Board.create({ title: 'test board' })
            .then(board => {
                assert.isTrue(shortid.isValid(board.id));
            });
    });

    it('should return error message, when title is not provided', () => {
        const promise = Board.create();
        return assert.isRejected(promise, /Validation error.*must be not empty/);
    });

    it('should return error message, when title is emty string', () => {
        const promise = Board.create({ title: '' });
        return assert.isRejected(promise, /Validation error.*must be not empty/);
    });

    it('should return board with attributes declared in `defaultScope`', () => {
        const title = 'test board';
        return Board.create({ title })
            .then(board => {
                return Board.findById(board.id)
                    .then(entry => {
                        assert.deepEqual(entry.toJSON(), {
                            id: board.id,
                            lists: [],
                            title
                        });
                    });
            });
    });

    it('should be associated to list', () => {
        return Board.create({ id: 1, title: 'test board' })
            .then(board => board.createList({ id: 1, title: 'test list' }))
            .then(() => Board.findById(1))
            .then(board => {
                const _board = board.toJSON();
                assert.deepEqual(_board, {
                    id: '1',
                    title: 'test board',
                    lists: [{
                        id: '1',
                        title: 'test list',
                        cards: []
                    }]
                });
            });
    });
});
