import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Board from 'server/models/Board';

describe('Board', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update board and return updated board', () => {
            return Board.update('1', { title: 'updated title' })
                .then(board => {
                    assert.deepEqual(board, {
                        id: '1',
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop board entry', () => {
            return Board.drop('2')
                .then(() => {
                    return db.query(`SELECT id FROM boards WHERE id = '2'`);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped board id', () => {
            return Board.drop('2')
                .then(result => {
                    assert.equal(result.id, '2');
                });
        });
    });

    describe('createList', () => {
        const listData = {
            title: 'test list'
        };

        it('should create list', () => {
            return Board.createList('1', listData).then(list => {
                assert.property(list, 'id');
                delete list.id;
                assert.deepEqual(list, {
                    title: listData.title
                });
            });
        });

        it('should relate list to board', () => {
            return Board.createList('1', listData).then(list => {
                return db.one('SELECT board_id FROM boards_lists WHERE list_id = $1', [list.id]);
            }).then(result => {
                assert.equal(result.board_id, '1');
            });
        });

        it('should generate shortid', () => {
            return Board.createList('1', listData).then(list => {
                assert.isTrue(shortid.isValid(list.id));
            });
        });
    });

    describe('find', () => {
        const nestedBoards = [{
            id: '1',
            title: 'test board',
            lists: [{
                id: '1',
                title: 'test list',
                cards: [{
                    id: '1',
                    text: 'test card'
                }]
            }]
        }, {
            id: '2',
            title: 'test board 2',
            lists: []
        }];

        function removeCreatedAt(arr) {
            arr.forEach(ent => {
                _.keys(ent).forEach(key => {
                    const value = ent[key];

                    if (value instanceof Array) {
                        return removeCreatedAt(value);
                    }

                    if (key === 'created_at') {
                        delete ent[key];
                        return;
                    }
                });
            });
        };

        describe('findById', () => {
            it('should return board with nested children', () => {
                return Board.findById('1')
                    .then(board => {
                        assert.deepEqual(board, nestedBoards[0]);
                    });
            });
        });

        describe('findAll', () => {
            it('should return all boards with nested children', () => {
                return Board.findAll()
                    .then(boards => {
                        assert.deepEqual(boards, nestedBoards);
                    });
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO boards(id, title) VALUES ('1', 'test board'), ('2', 'test board 2');
        INSERT INTO lists(id, title) VALUES ('1', 'test list');
        INSERT INTO boards_lists VALUES ('1', '1');
        INSERT INTO cards(id, text) VALUES ('1', 'test card');
        INSERT INTO lists_cards VALUES ('1', '1');
    `);
};
