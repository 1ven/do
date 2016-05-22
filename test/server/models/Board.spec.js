import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import Board from 'server/models/Board';

const id = () => shortid.generate();

const ids = {
    users: [id()],
    boards: [id(), id()],
    lists: [id()],
    cards: [id()]
};

describe('Board', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('update', () => {
        it('should update board and return updated board', () => {
            return Board.update(ids.boards[0], { title: 'updated title' })
                .then(board => {
                    assert.deepEqual(board, {
                        id: ids.boards[0],
                        title: 'updated title'
                    });
                });
        });
    });

    describe('drop', () => {
        it('should drop board entry', () => {
            return Board.drop(ids.boards[1])
                .then(() => {
                    return db.query(`SELECT id FROM boards WHERE id = '2'`);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped board id', () => {
            return Board.drop(ids.boards[1])
                .then(result => {
                    assert.equal(result.id, ids.boards[1]);
                });
        });
    });

    describe('createList', () => {
        const listData = {
            title: 'test list'
        };

        it('should create list', () => {
            return Board.createList(ids.boards[0], listData).then(list => {
                assert.property(list, 'id');
                delete list.id;
                assert.deepEqual(list, {
                    title: listData.title
                });
            });
        });

        it('should relate list to board', () => {
            return Board.createList(ids.boards[0], listData).then(list => {
                return db.one('SELECT board_id FROM boards_lists WHERE list_id = $1', [list.id]);
            }).then(result => {
                assert.equal(result.board_id, ids.boards[0]);
            });
        });

        it('should generate shortid', () => {
            return Board.createList(ids.boards[0], listData).then(list => {
                assert.isTrue(shortid.isValid(list.id));
            });
        });
    });

    describe('find', () => {
        const nestedBoards = [{
            id: ids.boards[0],
            title: 'test board',
            lists: [{
                id: ids.lists[0],
                title: 'test list',
                cards: [{
                    id: ids.cards[0],
                    text: 'test card'
                }]
            }]
        }, {
            id: ids.boards[1],
            title: 'test board 2',
            lists: []
        }];

        describe('findById', () => {
            it('should return board with nested children', () => {
                return Board.findById(ids.boards[0])
                    .then(board => {
                        assert.deepEqual(board, nestedBoards[0]);
                    });
            });
        });

        describe('findAllByUser', () => {
            it('should return all boards with nested children', () => {
                return Board.findAllByUser(ids.users[0])
                    .then(boards => {
                        assert.deepEqual(boards, [nestedBoards[0]]);
                    });
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO users(id, username, email, hash, salt) VALUES ($5, 'test', 'test@test.com', 'hash', 'salt');
        INSERT INTO boards(id, title) VALUES ($1, 'test board'), ($2, 'test board 2');
        INSERT INTO users_boards VALUES ($5, $1);
        INSERT INTO lists(id, title) VALUES ($3, 'test list');
        INSERT INTO boards_lists VALUES ($1, $3);
        INSERT INTO cards(id, text) VALUES ($4, 'test card');
        INSERT INTO lists_cards VALUES ($3, $4);
    `, [ids.boards[0], ids.boards[1], ids.lists[0], ids.cards[0], ids.users[0]]);
};
