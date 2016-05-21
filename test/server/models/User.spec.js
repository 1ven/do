import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import { recreateTables } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

const userId = shortid.generate();

const props = {
    username: 'test',
    email: 'test@mail.com',
    password: 123456,
    confirmation: 123456
};

describe('User', () => {
    beforeEach(() => recreateTables().then(setup));

    describe('create', () => {
        
    });

    describe('validate', () => {
        function getMessages(err) {
            return _.reduce(err.validation, (acc, item) => {
                return [...acc, item.message];
            }, []);
        };

        it('should not be rejected if all props are valid', () => {
            return User.validate({
                username: 'johnnnny',
                email: 'test@mail.com',
                password: 123456,
                confirmation: 123456
            }).catch(err => {
                assert.deepEqual(err.validation, []);
            });
        });

        describe('username', () => {
            it('should be rejected, when username is not between 3 and 20 characters', () => {
                return User.validate(_.assign({}, props, {
                    username: 'ab'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must be between 3 and 20 characters long');
                    });
            });

            it('should be rejected, when username contains spaces', () => {
                return User.validate(_.assign({}, props, {
                    username: 'i am john'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must not contain spaces');
                    });

            });

            it('should be rejected, when username is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Username is required');
                    });
            });

            it('should be rejected when username is already exists', () => {
                const id = shortid.generate();
                return db.none(`
                    INSERT INTO users (id, username, email, hash, salt)
                    VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')
                `, [id]).then(() => User.validate({ username: 'someuser' }))
                    .catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Username is already taken');
                    });
            });
        });

        describe('password', () => {
            it('should be rejected, when password less than 6 characters length', () => {
                return User.validate(_.assign({}, props, {
                    password: 1234,
                    confirmation: 1234
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Must be at least 6 characters long');
                    });

            });

            it('should be rejected, when password is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Password is required');
                    });
            });
        });

        describe('confirmation', () => {
            it('should be rejected, when given passwords do not match', () => {
                return User.validate(_.assign({}, props, {
                    confirmation: 1234
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Passwords not match');
                    });

            });

            it('should be rejected, when password confirmation is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Password confirmation is required');
                    });
            });
        });

        describe('email', () => {
            it('should be rejected, when email is invalid', () => {
                return User.validate(_.assign({}, props, {
                    email: 'not valid email'
                })).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Invalid email');
                    });
            });

            it('should be rejected, when email is not provided', () => {
                return User.validate({}).catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Email is required');
                    });
            });

            it('should be rejected when email is already exists', () => {
                const id = shortid.generate();
                return db.none(`
                    INSERT INTO users (id, username, email, hash, salt)
                    VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')
                `, [id]).then(() => User.validate({ email: 'someuser@mail.com' }))
                    .catch(getMessages)
                    .then(messages => {
                        assert.include(messages, 'Email is already taken');
                    });
            });
        });
    });

    describe('checkAvailability', () => {
        it('should resolve true, if entry with given prop does not exist', () => {
            return User.checkAvailability('username', 'someuser')
                .then(isValid => assert.isTrue(isValid));
        });

        it('should resolve false, if entry with given prop exists', () => {
            const id = shortid.generate();
            return db.none(`
                INSERT INTO users (id, username, email, hash, salt)
                VALUES ($1, 'someuser', 'someuser@mail.com', 'hash', 'salt')
            `, [id]).then(() => {
                return User.checkAvailability('username', 'someuser')
                    .then(isValid => assert.isNotTrue(isValid));
            });
        });
    });

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
