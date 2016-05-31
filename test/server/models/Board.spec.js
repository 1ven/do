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
                    assert.property(board, 'link');
                    assert.property(board.activity, 'created_at');
                    delete board.activity.created_at;
                    assert.deepEqual(_.omit(board, ['link']), {
                        id: ids.boards[0],
                        title: 'updated title',
                        activity: {
                            id: 1,
                            action: 'Updated',
                            type: 'board',
                            entry: {
                                title: 'updated title',
                                link: '/boards/' + ids.boards[0]
                            }
                        }
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
                assert.property(list.activity, 'created_at');
                delete list.activity.created_at;
                assert.deepEqual(_.omit(list, ['id']), {
                    title: listData.title,
                    link: '/boards/' + ids.boards[0] + '/lists/' + list.id,
                    activity: {
                        id: 1,
                        action: 'Created',
                        type: 'list',
                        entry: {
                            title: listData.title,
                            link: '/boards/' + ids.boards[0] + '/lists/' + list.id
                        }
                    }
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
            link: '/boards/' + ids.boards[0],
            lists: [{
                id: ids.lists[0],
                title: 'test list',
                link: '/boards/' + ids.boards[0] + '/lists/' + ids.lists[0],
                cards: [{
                    id: ids.cards[0],
                    text: 'test card',
                    link: '/boards/' + ids.boards[0] + '/cards/' + ids.cards[0]
                }]
            }]
        }, {
            id: ids.boards[1],
            title: 'test board 2',
            link: '/boards/' + ids.boards[1],
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
                        const board = _.omit(nestedBoards[0], ['lists']);
                        assert.deepEqual(boards, [board]);
                    });
            });
        });
    });

    describe('archive', () => {
        const boardId = ids.boards[0];

        it('should set `archive` flag to true', () => {
            return Board.archive(boardId)
                .then(() => {
                    return db.one(`SELECT archived FROM boards WHERE id = $1`, [boardId]);
                })
                .then(result => {
                    assert.isTrue(result.archived);
                });
        });

        it('should return archived entry id', () => {
            return Board.archive(boardId)
                .then(result => {
                    assert.deepEqual(result, {
                        id: boardId
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
