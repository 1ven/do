import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import User from 'server/models/User';

chai.use(chaiAsPromised);

const data = {
    username: 'testuser',
    email: 'user@test.com'
};

describe('User', () => {
    it('should create user and return created entry', () => {
        const username = 'test user';
        return User.create(data)
            .then(user => {
                const _user = user.toJSON();
                assert.deepEqual(_user.username, data.username);
            });
    });

    it('should return user with attributes declared in `defaultScope` by default', () => {
        return User.create(_.assign({}, data, { id: 1 }))
            .then(() => User.findById(1))
            .then(user => {
                assert.deepEqual(user.toJSON(), {
                    id: '1',
                    username: data.username
                });
            });
    });

    it('should return user with attributes declared in `self` scope, when `.scope("self")` is used', () => {
        return User.create(data)
            .then(user => {
                return User.scope('self').findById(user.id)
            })
            .then(user => {
                assert.deepEqual(user.toJSON(), {
                    id: user.id,
                    username: data.username,
                    email: data.email,
                    boards: []
                });
            });
    });

    it('should generate valid shortid', () => {
        return User.create(data)
            .then(user => {
                assert.isTrue(shortid.isValid(user.id));
            });
    });

    it('should return user with attributes declared in `defaultScope`', () => {
        return User.create(data)
            .then(user => {
                return User.findById(user.id)
                    .then(entry => {
                        assert.deepEqual(entry.toJSON(), {
                            id: user.id,
                            username: data.username
                        });
                    });
            });
    });

    it('should be associated to board', () => {
        return User.create(_.assign({}, data, { id: 1 }))
            .then(user => user.createBoard({ id: 1, title: 'test board' }))
            .then(() => User.scope('self').findById(1))
            .then(user => {
                const _user = user.toJSON();
                assert.deepEqual(_user, {
                    id: '1',
                    username: data.username,
                    email: data.email,
                    boards: [{
                        id: '1',
                        title: 'test board',
                        lists: []
                    }]
                });
            });
    });

    it('should convert username to lowercase', () => {
        return User.create(_.assign({}, data, { username: 'tEsTuSeR' }))
            .then(user => {
                const _user = user.toJSON();
                assert.equal(_user.username, 'testuser');
            });
    });

    it('should convert email to lowercase', () => {
        return User.create(_.assign({}, data, { email: 'teSt@maIl.Com' }))
            .then(user => {
                const _user = user.toJSON();
                assert.equal(_user.email, 'test@mail.com');
            });
    });

    it('should be rejected, when username is not provided', () => {
        const _data = _.assign({}, data);

        delete _data.username;

        const promise = User.create(_data);
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should be rejected, when username is emty string', () => {
        const promise = User.create(_.assign({}, data, { username: '' }));
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should be rejected, when username is less than 3 characters length', () => {
        const promise = User.create(_.assign({}, data, { username: 'ab' }));
        return assert.isRejected(promise, /Validation error.*between 3 and 20/);
    });

    it('should be rejected, when username is more than 20 characters length', () => {
        const promise = User.create(_.assign({}, data, { username: 'veryveryveryveryveryverylongusername' }));
        return assert.isRejected(promise, /Validation error.*between 3 and 20/);
    });

    it('should be rejected, when username is contain spaces', () => {
        const promise = User.create(_.assign({}, data, { username: 'i am user' }));
        return assert.isRejected(promise, /Validation error.*not contain spaces/);
    });

    it('should be rejected, when username is exists', () => {
        const promise = User.create(data)
            .then(() => {
                return User.create(_.assign({}, data, { email: 'user2@test.com' }));
            });
        return assert.isRejected(promise, /Validation error.*Username is already in use/);
    });

    it('should be rejected, when email is not provided', () => {
        const _data = _.assign({}, data);

        delete _data.email;

        const promise = User.create(_data);
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should be rejected, when email is emty string', () => {
        const promise = User.create(_.assign({}, data, { email: '' }));
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should be rejected, when email is not valid', () => {
        const promise = User.create(_.assign({}, data, { email: 'not valid email' }));
        return assert.isRejected(promise, /Validation error.*not valid/);
    });

    it('should be rejected, when email is exists', () => {
        const promise = User.create(data)
            .then(() => {
                return User.create(_.assign({}, data, { username: 'testuser2' }));
            });
        return assert.isRejected(promise, /Validation error.*Email is already in use/);
    });
});
