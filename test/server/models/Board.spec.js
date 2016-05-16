import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import Board from 'server/models/Board';

chai.use(chaiAsPromised);

const boardData = {
    id: shortid.generate(),
    title: 'test board'
};

const listData = {
    id: shortid.generate(),
    title: 'test list'
};

describe('Board', () => {
    describe('create', () => {
        it('should create board', () => {
            return Board.create(boardData)
                .then(board => {
                    const _board = board.toJSON();
                    assert.deepEqual(_board.title, boardData.title);
                });
        });

        it('should generate valid shortid', () => {
            return Board.create(_.assign({}, boardData, { id: undefined }))
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
    });

    describe('find', () => {
        it('should return board with attributes declared in `defaultScope` by default', () => {
            return Board.create(boardData)
                .then(board => {
                    return Board.findById(board.id)
                })
                .then(entry => {
                    assert.deepEqual(entry.toJSON(), {
                        id: boardData.id,
                        title: boardData.title,
                        lists: []
                    });
                });
        });

        it('should include lists in response', () => {
            return Board.create(boardData)
                .then(board => board.createList(listData))
                .then(() => Board.findById(boardData.id))
                .then(board => {
                    const _board = board.toJSON();
                    assert.deepEqual(_board, {
                        id: boardData.id,
                        title: boardData.title,
                        lists: [{
                            id: listData.id,
                            title: listData.title,
                            cards: []
                        }]
                    });
                });
        });
    });

    describe('createList', () => {
        it('should create list', () => {
            return Board.create(boardData)
                .then(board => board.createList(listData))
                .then(list => {
                    const _list = list.toJSON();
                    assert.equal(_list.id, listData.id);
                    assert.equal(_list.title, listData.title);
                    assert.equal(_list.boardId, boardData.id);
                    assert.lengthOf(_.keys(_list), 5);
                });
        });
    });

    describe('update', () => {
        it('should update board', () => {
            return Board.create(boardData)
                .then(board => {
                    return board.update({ title: 'test board 2' });
                })
                .then(board => {
                    assert.equal(board.title, 'test board 2');
                })
        });
    });
});
