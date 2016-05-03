import { assert } from 'chai';
import { recreateTables } from '../helpers';
import db from 'server/db';
import relationsChecker from 'server/utils/relationsChecker';

const initialHierarchy = relationsChecker.hierarchy;

describe('relationsChecker', () => {
    before(() => {
        relationsChecker.hierarchy = ['users', 'boards', 'lists', 'cards'];
    });

    after(() => {
        relationsChecker.hierarchy = initialHierarchy;
    });

    describe('check', () => {
        beforeEach(() => {
            return recreateTables()
                .then(() => {
                    return db.none(`
                        INSERT INTO users (username, email, hash, salt)
                            VALUES ('test', 'test@mail.com', 'hash', 'salt');
                        INSERT INTO boards (id, title)
                            VALUES (7, 'board 7'), (10, 'board 10'), (15, 'board 15');
                        INSERT INTO users_boards
                            VALUES (1, 10), (1, 15);
                        INSERT INTO lists (id, title)
                            VALUES (4, 'list 4'), (5, 'list 5');
                        INSERT INTO boards_lists
                            VALUES (15, 4);
                    `);
                });
        });

        it('should resolve true if entries are related', () => {
            return relationsChecker.check({
                users: 1,
                lists: 4
            }).then(result => assert.isTrue(result));
        });

        it('should resolve false if entries are not related', () => {
            return relationsChecker.check({
                users: 1,
                lists: 5
            }).then(result => assert.isFalse(result));
        });

        it('should resolve false if higher entry does not exist', () => {
            return relationsChecker.check({
                users: 27,
                lists: 5
            }).then(result => assert.isFalse(result));
        });

        it('should resolve false if lower entry does not exist', () => {
            return relationsChecker.check({
                users: 1,
                lists: 50
            }).then(result => assert.isFalse(result));
        });
    });

    describe('_getHigherEntity', () => {
        it('should return higher entity name', () => {
            const higher1 = relationsChecker._getHigherEntity(['cards', 'users']);
            assert.equal(higher1, 'users');
            const higher2 = relationsChecker._getHigherEntity(['cards', 'boards']);
            assert.equal(higher2, 'boards');
        });
    });

    describe('_getIndexInHierarchy', () => {
        it('should return index of entity in hierarchy', () => {
            const index = relationsChecker._getIndexInHierarchy('lists');
            assert.equal(index, 2);
        });
    });

    describe('_getChildEntity', () => {
        it('should return next entity in hierarchy', () => {
            const childEntity = relationsChecker._getChildEntity('lists');
            assert.equal(childEntity, 'cards');
        });

        it('should return null, if entity has no children', () => {
            const childEntity = relationsChecker._getChildEntity('cards');
            assert.isNull(childEntity);
        });
    });

    describe('_getInnerEntities', () => {
        it('should return array entities between two given entities', () => {
            const insideEntities = relationsChecker._getInnerEntities('users', 'cards');
            assert.deepEqual(insideEntities, ['boards', 'lists']);
        });

        it('should return [], if entities are siblings', () => {
            const insideEntities = relationsChecker._getInnerEntities('lists', 'cards');
            assert.deepEqual(insideEntities, []);
        });
    });

    describe('_getIdsNames', () => {
        it('should return ids columns names in relations table', () => {
            const idsNames = relationsChecker._getIdsNames(['boards', 'lists', 'cards']);
            assert.deepEqual(idsNames, ['board_id', 'list_id', 'card_id']);
        });
    });

    describe('_getJoinSql', () => {
        it('should return sql with join', () => {
            const sql = relationsChecker._getJoinSql('users', 'cards', ['user_id', 'card_id']);
            assert.equal(sql,
                'JOIN boards_lists AS t1 ON (p.board_id = t1.board_id)' +
                'JOIN lists_cards AS t2 ON (t1.list_id = t2.list_id)'
            );
        });

        it('should return empty string, when given entities are siblings', () => {
            const sql = relationsChecker._getJoinSql('users', 'boards', ['user_id', 'board_id']);
            assert.equal(sql, '');
        });
    });

    describe('_getSql', () => {
        it('should return sql for checking relations where between entities are 2 or more entities', () => {
            const sql = relationsChecker._getSql('users', 'cards', [10, 5]);
            assert.equal(sql,
                'SELECT * FROM users_boards AS p ' +
                'JOIN boards_lists AS t1 ON (p.board_id = t1.board_id)' +
                'JOIN lists_cards AS t2 ON (t1.list_id = t2.list_id)' +
                'WHERE user_id = 10 AND card_id = 5'
            );
        });

        it('should return sql for checking relations where between entities 1 entity', () => {
            const sql = relationsChecker._getSql('users', 'lists', [10, 5]);
            assert.equal(sql,
                'SELECT * FROM users_boards AS p ' +
                'JOIN boards_lists AS t1 ON (p.board_id = t1.board_id)' +
                'WHERE user_id = 10 AND list_id = 5'
            );
        });

        it('should return sql for checking relations where entities are siblings', () => {
            const sql = relationsChecker._getSql('users', 'boards', [10, 5]);
            assert.equal(sql,
                'SELECT * FROM users_boards AS p ' +
                'WHERE user_id = 10 AND board_id = 5'
            );
        });
    });
});
