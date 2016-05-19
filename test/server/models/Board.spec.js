import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Board from 'server/models/Board';

const setup = require('../helpers').setup();
const _board = setup.data.boards[0];

describe('Board', () => {
    beforeEach(() => recreateTables().then(setup.create));

    describe('update', () => {
        it('should update board and return updated board', () => {
            return Board.update(_board.id, { title: 'updated title' })
                .then(board => {
                    assert.deepEqual(board, {
                        id: _board.id,
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop board entry', () => {
            return Board.drop(_board.id)
                .then(() => {
                    return db.query(`SELECT id FROM boards WHERE id = $1`, [_board.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped board id', () => {
            return Board.drop(_board.id)
                .then(result => {
                    assert.equal(result.id, _board.id);
                });
        });

        it('should remove relations', () => {
            return Board.drop(_board.id)
                .then(() => {
                    return db.query(`SELECT user_id FROM users_boards WHERE board_id = $1`, [_board.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });
    });

    describe('createList', () => {
        const listData = {
            id: shortid.generate(),
            title: 'test list'
        };

        it('should create list', () => {
            return Board.createList(_board.id, listData).then(list => {
                assert.deepEqual(list, listData);
            });
        });

        it('should relate list to list', () => {
            return Board.createList(_board.id, listData).then(list => {
                return db.one('SELECT board_id FROM boards_lists WHERE list_id = $1', [list.id]);
            }).then(result => {
                assert.equal(result.board_id, _board.id);
            });
        });
    });

    describe('findById', () => {
        
    });

    describe('findAll', () => {
        
    });

    describe('create', () => {
        
    });
});
