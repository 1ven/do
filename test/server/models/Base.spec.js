import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db from 'server/db';
import _ from 'lodash';
import Base from 'server/models/Base';

chai.use(chaiAsPromised);

const Card = _.assign({}, Base, {
    table: 'cards'
});

const List = _.assign({}, Base, {
    table: 'lists',
    children: [Card]
});

const Board = _.assign({}, Base, {
    table: 'boards',
    children: [List]
});

function setup() {
    return db.none(`
        INSERT INTO boards (title) VALUES ('boards entry 1'), ('boards entry 2'), ('boards entry 3');
        INSERT INTO lists (title) VALUES ('lists entry 1'), ('lists entry 2'), ('lists entry 3');
        INSERT INTO cards (title) VALUES ('cards entry 1'), ('cards entry 2'), ('cards entry 3');
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
                        title: 'cards entry 1'
                    }
                ]
            },
            {
                id: 3,
                title: 'lists entry 3',
                cards: [
                    {
                        id: 2,
                        title: 'cards entry 2'
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
            cards
            CASCADE
        `)
            .then(() => db.none(`
                CREATE TABLE boards(
                    id serial PRIMARY KEY,
                    title text NOT NULL
                );
                CREATE TABLE lists(
                    id serial PRIMARY KEY,
                    title text NOT NULL
                );
                CREATE TABLE cards(
                    id serial PRIMARY KEY,
                    title text NOT NULL
                );
                CREATE TABLE boards_lists(
                    board_id integer NOT NULL REFERENCES boards ON DELETE RESTRICT,
                    list_id integer PRIMARY KEY REFERENCES lists ON DELETE CASCADE
                );
                CREATE TABLE lists_cards(
                    list_id integer NOT NULL REFERENCES lists ON DELETE RESTRICT,
                    card_id integer PRIMARY KEY REFERENCES cards ON DELETE CASCADE
                );
            `));
    });

    describe('create', () => {
        it('should create entry', () => {
            const props = { title: 'test board' };
            return Board.create(props)
                .then(board => {
                    assert.property(board, 'id');
                    assert.equal(board.title, props.title);
                });
        });
    });

    describe('get', () => {
        it('should return entry by given id', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.get(2))
                .then(board => assert.deepEqual(board, { id: 2, title: 'test board 2'}));
        });

        it('should return all entries when id is not provided', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.get())
                .then(boards => assert.deepEqual(boards, [
                    { id: 1, title: 'test board 1' },
                    { id: 2, title: 'test board 2' },
                    { id: 3, title: 'test board 3' }
                ]));
        });
    });

    describe('remove', () => {
        it('should remove entry', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test board 1'), ('test board 2'), ('test board 3')
            `).then(() => Board.remove(2))
                .then(() => db.query('SELECT * FROM boards'))
                .then(boards => assert.deepEqual(boards, [
                    { id: 1, title: 'test board 1' },
                    { id: 3, title: 'test board 3' }
                ]));
        });

        it('should be idempotent', () => {
            return db.none(`INSERT INTO boards (title) VALUES
                ('test title 1'), ('test title 2'), ('test title 3')
            `).then(() => Board.remove(2))
                .then(result => assert.isUndefined(result))
                .then(() => Board.remove(2))
                .then(result => assert.isUndefined(result));
        });
    });

    describe('createChild', () => {
        it('should create child', () => {
            return db.none(`
                INSERT INTO boards (title) VALUES ('test board 1'), ('test board 2')
            `).then(() => {
                return Board.createChild(2, { title: 'test list' }, List)
            }).then(() => {
                return db.one('SELECT * FROM lists WHERE id = 1');
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
                return db.one('SELECT * FROM boards_lists WHERE board_id = 2');
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

    describe('getWithChildren', () => {
        it('should return entry by given id with all nested children', () => {
            return setup().then(() => Board.getWithChildren(2))
                .then(nestedBoard => {
                    assert.deepEqual(nestedBoard, expected[1]);
                });
        });

        it('should return all entries with all nested children when id is not provided', () => {
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
                .then(cards => assert.deepEqual(cards, [{ id: 1, title: 'cards entry 1' }]));
        });
    });

    describe('_getChildLeaves', () => {
        it('should return array of related childs which are leaves', () => {
            return setup().then(() => {
                return List._getChildLeaves('lists_cards', 'list_id', 'card_id', 2, 'cards');
            }).then(cards => assert.deepEqual(cards, [{ id: 1, title: 'cards entry 1' }]));
        });
    });

    describe('_getChildTrees', () => {
        it('should return array of related childs which are trees', () => {
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
                .then(() => db.one('SELECT * FROM boards_lists WHERE board_id = 2'))
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
            assert.isRejected(promise);
        });
    });
});
