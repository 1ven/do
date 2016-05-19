import { assert } from 'chai';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

const setup = require('../helpers').setup();
const _user = setup.data.users[0];

describe('User', () => {
    beforeEach(() => recreateTables().then(setup.create));

    describe('update', () => {
        it('should update user and return updated user', () => {
            return User.update(_user.id, { username: 'updated' })
                .then(user => {
                    assert.deepEqual(user.username, 'updated');
                });
        });
    });

    describe('drop', () => {
        it('should drop user entry', () => {
            return User.drop(_user.id)
                .then(() => {
                    return db.query(`SELECT id FROM users WHERE id = $1`, [_user.id]);
                })
                .then(result => {
                    assert.lengthOf(result, 0);
                });
        });

        it('should return dropped user id', () => {
            return User.drop(_user.id)
                .then(result => {
                    assert.equal(result.id, _user.id);
                });
        });
    });

    describe('createBoard', () => {
        const boardData = {
            id: shortid.generate(),
            title: 'test board'
        };

        it('should create board', () => {
            return User.createBoard(_user.id, boardData).then(board => {
                assert.deepEqual(board, boardData);
            });
        });

        it('should relate board to user', () => {
            return User.createBoard(_user.id, boardData).then(board => {
                return db.one('SELECT user_id FROM users_boards WHERE board_id = $1', [board.id]);
            }).then(result => {
                assert.equal(result.user_id, _user.id);
            });
        });
    });
});
