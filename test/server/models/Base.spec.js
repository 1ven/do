import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db from 'server/db';
import _ from 'lodash';
import Base from 'server/models/Base';

chai.use(chaiAsPromised);

const Card = _.assign({}, Base, {
    table: 'cards',
    mutableFields: ['text'],
    visibleFields: ['id', 'text']
});

const List = _.assign({}, Base, {
    table: 'lists',
    mutableFields: ['title'],
    visibleFields: ['id', 'title'],
    children: [Card]
});

const Board = _.assign({}, Base, {
    table: 'boards',
    mutableFields: ['title'],
    visibleFields: ['id', 'title'],
    children: [List]
});

const User = _.assign({}, Base, {
    table: 'users',
    visibleFields: ['id', 'username']
});

function setup() {
    return db.none(`
        INSERT INTO boards (title) VALUES ('boards entry 1'), ('boards entry 2'), ('boards entry 3');
        INSERT INTO lists (title) VALUES ('lists entry 1'), ('lists entry 2'), ('lists entry 3');
        INSERT INTO cards (text) VALUES ('cards entry 1'), ('cards entry 2'), ('cards entry 3');
        INSERT INTO boards_lists VALUES (2, 2), (2, 3);
        INSERT INTO lists_cards VALUES (2, 1), (3, 2);
    `);
};

const expected = [
    {
        id: 1,
        title: 'boards entry 1',
        lists: []
    },
    {
        id: 2,
        title: 'boards entry 2',
        lists: [
            {
                id: 2,
                title: 'lists entry 2',
                cards: [
                    {
                        id: 1,
                        text: 'cards entry 1'
                    }
                ]
            },
            {
                id: 3,
                title: 'lists entry 3',
                cards: [
                    {
                        id: 2,
                        text: 'cards entry 2'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: 'boards entry 3',
        lists: []
    },
];


describe('Base model', () => {
    beforeEach(() => {
        return db.none(`DROP TABLE IF EXISTS
            boards,
            boards_lists,
            lists,
            lists_cards,
            cards,
            users
            CASCADE
        `)
            .then(() => db.none(`
                CREATE TABLE boards(
                    id serial PRIMARY KEY,
                    title text NOT NULL,
                    hidden text
                );
                CREATE TABLE lists(
                    id serial PRIMARY KEY,
                    title text NOT NULL,
                    hidden text
                );
                CREATE TABLE cards(
                    id serial PRIMARY KEY,
                    text text NOT NULL,
                    hidden text
                );
                CREATE TABLE boards_lists(
                    board_id integer NOT NULL REFERENCES boards ON DELETE RESTRICT,
                    list_id integer PRIMARY KEY REFERENCES lists ON DELETE CASCADE
                );
                CREATE TABLE lists_cards(
                    list_id integer NOT NULL REFERENCES lists ON DELETE RESTRICT,
                    card_id integer PRIMARY KEY REFERENCES cards ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS users(
                    id serial PRIMARY KEY,
                    username character varying(20),
                    hash text NOT NULL CHECK (hash <> ''),
                    salt text NOT NULL CHECK (salt <> '')
                );
            `));
    });

    describe('create', () => {
        it('should create entry', () => {
            const props = { title: 'test board' };
            return Board.create(props)
                .then(() => db.one('SELECT title FROM boards'))
                .then(board => {
                    assert.equal(board.title, props.title);
                });
        });

        it('should return created entry without hidden fields', () => {
            return Board.create({ title: 'test board' })
                .then(board => {
                    assert.deepEqual(board, {
                        id: 1,
                        title: 'test board'
                    });
                });
        });
    });

    describe('getOne', () => {
        it('should return entry by given props', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.getOne({ id: 2 }))
                .then(board => assert.deepEqual(board, { id: 2, title: 'test board 2'}));
        });
    });

    describe('get', () => {
        it('should return entries by given props', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.get({ id: 2 }))
                .then(board => assert.deepEqual(board[0], { id: 2, title: 'test board 2'}));
        });

        it('should return all entries when props are not provided', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.get())
                .then(boards => assert.deepEqual(boards, [
                    { id: 1, title: 'test board 1' },
                    { id: 2, title: 'test board 2' },
                    { id: 3, title: 'test board 3' }
                ]));
        });

        it('should return columns, declared in `this.visibleFields`', () => {
            return db.none(`
                INSERT INTO users (username, hash, salt)
                VALUES ('test user 1', 'hash', 'salt'), ('test user 2', 'hash', 'salt')
            `).then(() => User.get())
                .then(users => assert.deepEqual(users, [
                    {
                        id: 1,
                        username: 'test user 1'
                    },
                    {
                        id: 2,
                        username: 'test user 2'
                    }
                ]));
        });
    });

    describe('remove', () => {
        it('should remove entry', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.remove(2))
                .then(() => db.query('SELECT id, title FROM boards'))
                .then(boards => assert.deepEqual(boards, [
                    { id: 1, title: 'test board 1' },
                    { id: 3, title: 'test board 3' }
                ]));
        });

        it('should resolve removed id', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test title 1'), ('test title 2'), ('test title 3')
            `).then(() => Board.remove(2))
                .then(result => assert.deepEqual(result, { id: 2 }))
        });
    });

    describe('createChild', () => {
        it('should create child', () => {
            return db.none(`
                INSERT INTO boards (title) VALUES ('test board 1'), ('test board 2')
            `).then(() => {
                return Board.createChild(2, { title: 'test list' }, List)
            }).then(() => {
                return db.one('SELECT id, title FROM lists WHERE id = 1');
            }).then(list => {
                assert.deepEqual(list, { id: 1, title: 'test list' });
            });
        });

        it('should relate child with parent entry', () => {
            return db.none(`
                INSERT INTO boards (title) VALUES ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => {
                return Board.createChild(2, { title: 'test list' }, List);
            }).then(() => {
                return db.one('SELECT board_id, list_id FROM boards_lists WHERE board_id = 2');
            }).then(entry => assert.deepEqual(entry, { board_id: 2, list_id: 1 }));
        });

        it('should throw error if parent entry is not exists', () => {
            const promise = Board.createChild(6, { title: 'test list' }, List);
            return assert.isRejected(promise, /entry does not exist/);
        });

        it('should resolve created child', () => {
            return db.none(`
                INSERT INTO boards (title) VALUES ('test board 1'), ('test board 2')
            `).then(() => {
                return Board.createChild(2, { title: 'test list' }, List);
            }).then(list => {
                assert.deepEqual(list, { id: 1, title: 'test list' });
            });
        });
    });

    describe('getWithChildrenOne', () => {
        it('should return entry by given props with all nested children', () => {
            return setup().then(() => Board.getWithChildrenOne({ id: 2 }))
                .then(nestedBoard => {
                    assert.deepEqual(nestedBoard, expected[1]);
                });
        });
    });

    describe('getWithChildren', () => {
        it('should return entries with all nested children', () => {
            return setup().then(() => Board.getWithChildren({ id: 2 }))
                .then(nestedBoards => {
                    assert.deepEqual(nestedBoards, [expected[1]]);
                });
        });

        it('should return all entries with all nested children when props are not provided', () => {
            return setup().then(() => Board.getWithChildren())
                .then(nestedBoards => {
                    assert.deepEqual(nestedBoards, expected);
                });
        });
    });

    describe('_getAllChildren', () => {
        it('should return object with all nested children of parent entry', () => {
            return setup().then(() => Board._getAllChildren(2))
                .then(childrenObj => assert.deepEqual(childrenObj, { lists: expected[1].lists }));
        });
    });

    describe('_getChildEntries', () => {
        it('should return all related child trees with all nested children', () => {
            return setup().then(() => Board._getChildEntries(2, List))
                .then(nestedLists => assert.deepEqual(nestedLists, expected[1].lists));
        });

        it('should return all related child leaves', () => {
            return setup().then(() => List._getChildEntries(2, Card))
                .then(cards => assert.deepEqual(cards, [{ id: 1, text: 'cards entry 1' }]));
        });
    });

    describe('_getChildLeaves', () => {
        it('should return array of related childs which are leaves, only with columns declared in `this.visibleFields`', () => {
            return setup().then(() => {
                return List._getChildLeaves('lists_cards', 'list_id', 'card_id', 2, Card);
            }).then(cards => assert.deepEqual(cards, [{ id: 1, text: 'cards entry 1' }]));
        });
    });

    describe('_getChildTrees', () => {
        it('should return array of related childs which are trees, only with columns declared in `this.visibleFields`', () => {
            return setup().then(() => {
                return Board._getChildTrees('boards_lists', 'board_id', 'list_id', 2, List);
            }).then(nestedLists => assert.deepEqual(nestedLists, expected[1].lists));
        });
    });

    describe('_relate', () => {
        it('should relate parent with child', () => {
            return db.none(`
                INSERT INTO boards (title) VALUES ('boards entry 1'), ('boards entry 2');
                INSERT INTO lists (title) VALUES ('lists entry 1'), ('lists entry 2');
            `)
                .then(() => Board._relate(2, 1, 'lists'))
                .then(() => db.one('SELECT board_id, list_id FROM boards_lists WHERE board_id = 2'))
                .then(entry => assert.deepEqual(entry, { board_id: 2, list_id: 1 }));
        });
    });

    describe('_isEntryExists', () => {
        it('should be fulfilled when entry exists', () => {
            return db.none(`INSERT INTO boards (title) VALUES ('entry title')`)
                .then(() => {
                    const promise = Board._isEntryExists(1);
                    assert.isFulfilled(promise);
                });
        });

        it('should be rejected when entry does not exists', () => {
            const promise = Board._isEntryExists(1);
            return assert.isRejected(promise);
        });
    });

    describe('update', () => {
        function insert() {
            return db.none(`
                INSERT INTO boards (title) VALUES ('test board 1'), ('test board 2'), ('test board 3')
            `)
        };

        it('should update entry', () => {
            return insert()
                .then(() => Board.update(2, {
                    title: 'new title'
                }))
                .then(() => db.one('SELECT id, title FROM boards WHERE id = 2'))
                .then(updatedBoard => assert.deepEqual(updatedBoard, {
                    id: 2,
                    title: 'new title'
                }));
        });

        it('should return updated entry', () => {
            return insert()
                .then(() => Board.update(2, {
                    title: 'new title'
                })).then(updatedBoard => assert.deepEqual(updatedBoard, {
                    id: 2,
                    title: 'new title'
                }));
        });

        it('should throw error, when trying to update fields out of `this.mutableFields` array', () => {
            return insert()
                .then(() => {
                    const promise = Board.update(2, { id: 4 });
                    return assert.isRejected(promise, /can't update/);
                });
        });

        it('should throw error, when trying to update nonexistent entry', () => {
            const promise = Board.update(1, {
                title: 'new title'
            });
            return assert.isRejected(promise, /not exists/);
        });
    });
});
