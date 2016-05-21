import { assert } from 'chai';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

const userId = shortid.generate();

describe('User', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('createBoard', () => {
        const boardData = {
            title: 'test board'
        };

        it('should create board', () => {
            return User.createBoard(userId, boardData).then(board => {
                assert.property(board, 'id');
                delete board.id;
                assert.deepEqual(board, boardData);
            });
        });

        it('should relate board to user', () => {
            return User.createBoard(userId, boardData).then(board => {
                return db.one('SELECT user_id FROM users_boards WHERE board_id = $1', [board.id]);
            }).then(result => {
                assert.equal(result.user_id, userId);
            });
        });

        it('should generate shortid', () => {
            return User.createBoard(userId, boardData).then(board => {
                assert.isTrue(shortid.isValid(board.id));
            });
        });
    });
});

function setup() {
    return db.none(`
        INSERT INTO users (id, username, email, hash, salt)
        VALUES ($1, 'test', 'test@test.com', 'hash', 'salt');
    `, [userId]);
};
