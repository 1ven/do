import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';
import db from 'server/db';

import User from 'server/models/User';

chai.use(chaiAsPromised);

const userData = {
    id: shortid.generate(),
    username: 'testuser',
    email: 'user@test.com',
    password: 123456
};

const boardData = {
    id: shortid.generate(),
    title: 'test board'
};

describe('User', () => {
    describe('create', () => {
        it('should create user', () => {
            const username = 'test user';
            return User.create(userData)
                .then(user => {
                    const _user = user.toJSON();
                    assert.deepEqual(_user.username, userData.username);
                });
        });

        it('should generate valid shortid', () => {
            return User.create(_.assign({}, userData, { id: undefined }))
                .then(user => {
                    assert.isTrue(shortid.isValid(user.id));
                });
        });

        it('should convert username to lowercase', () => {
            return User.create(_.assign({}, userData, { username: 'tEsTuSeR' }))
                .then(user => {
                    const _user = user.toJSON();
                    assert.equal(_user.username, 'testuser');
                });
        });

        it('should convert email to lowercase', () => {
            return User.create(_.assign({}, userData, { email: 'teSt@maIl.Com' }))
                .then(user => {
                    const _user = user.toJSON();
                    assert.equal(_user.email, 'test@mail.com');
                });
        });

        it('should be rejected, when password is not provided', () => {
            const _userData = _.omit(userData, 'password');

            const promise = User.create(_userData);
            return assert.isRejected(promise, /Validation error.*Password is required/);
        });

        it('should be rejected, when username is not provided', () => {
            const _userData = _.omit(userData, 'username');

            const promise = User.create(_userData);
            return assert.isRejected(promise, /Validation error.*Username is required/);
        });

        it('should be rejected, when username is emty string', () => {
            const promise = User.create(_.assign({}, userData, { username: '' }));
            return assert.isRejected(promise, /Validation error.*Username is required/);
        });

        it('should be rejected, when username is less than 3 characters length', () => {
            const promise = User.create(_.assign({}, userData, { username: 'ab' }));
            return assert.isRejected(promise, /Validation error.*between 3 and 20/);
        });

        it('should be rejected, when username is more than 20 characters length', () => {
            const promise = User.create(_.assign({}, userData, { username: 'veryveryveryveryveryverylongusername' }));
            return assert.isRejected(promise, /Validation error.*between 3 and 20/);
        });

        it('should be rejected, when username is contain spaces', () => {
            const promise = User.create(_.assign({}, userData, { username: 'i am user' }));
            return assert.isRejected(promise, /Validation error.*not contain spaces/);
        });

        it('should be rejected, when username is exists', () => {
            const promise = User.create(userData)
                .then(() => {
                    return User.create(_.assign({}, userData, { email: 'user2@test.com' }));
                });
            return assert.isRejected(promise, /Validation error.*Username is already in use/);
        });

        it('should be rejected, when email is not provided', () => {
            const _userData = _.assign({}, userData);

            delete _userData.email;

            const promise = User.create(_userData);
            return assert.isRejected(promise, /Validation error.*is required/);
        });

        it('should be rejected, when email is emty string', () => {
            const promise = User.create(_.assign({}, userData, { email: '' }));
            return assert.isRejected(promise, /Validation error.*is required/);
        });

        it('should be rejected, when email is not valid', () => {
            const promise = User.create(_.assign({}, userData, { email: 'not valid email' }));
            return assert.isRejected(promise, /Validation error.*not valid/);
        });

        it('should be rejected, when email is exists', () => {
            const promise = User.create(userData)
                .then(() => {
                    return User.create(_.assign({}, userData, { username: 'testuser2' }));
                });
            return assert.isRejected(promise, /Validation error.*Email is already in use/);
        });
    });

    describe('find', () => {
        it('should return user with attributes declared in `defaultScope` by default', () => {
            const id = shortid.generate();
            return User.create(_.assign({}, userData, { id }))
                .then(() => User.findById(id))
                .then(user => {
                    assert.deepEqual(user.toJSON(), {
                        username: userData.username,
                        id
                    });
                });
        });

        it('should return user with attributes declared in `self` scope, when `.scope("self")` is used', () => {
            return User.create(userData)
                .then(user => {
                    return User.scope('self').findById(user.id)
                })
                .then(user => {
                    assert.deepEqual(user.toJSON(), {
                        id: user.id,
                        username: userData.username,
                        email: userData.email,
                        boards: []
                    });
                });
        });

        it('should include boards in response, when `.scope("self")` is used', () => {
            const userId = shortid.generate();
            return User.create(_.assign({}, userData, { id: userId }))
                .then(user => user.createBoard(boardData))
                .then(() => User.scope('self').findById(userId))
                .then(user => {
                    const _user = user.toJSON();
                    assert.deepEqual(_user, {
                        id: userId,
                        username: userData.username,
                        email: userData.email,
                        boards: [{
                            id: boardData.id,
                            title: boardData.title,
                            lists: []
                        }]
                    });
                });
        });
    });

    describe('createBoard', () => {
        it('should create board', () => {
            return User.create(userData)
                .then(user => {
                    return user.createBoard(boardData);
                })
                .then(board => {
                    const _board = board.toJSON();
                    assert.equal(_board.id, boardData.id);
                    assert.equal(_board.title, boardData.title);
                    assert.equal(_board.userId, userData.id);
                    assert.lengthOf(_.keys(_board), 5);
                })
        });
    });
});
