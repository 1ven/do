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

    it('should generate valid shortid', () => {
        return User.create(data)
            .then(user => {
                assert.isTrue(shortid.isValid(user.id));
            });
    });

    it('should return error message, when username is not provided', () => {
        const _data = _.assign({}, data);

        delete _data.username;

        const promise = User.create(_data);
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should return error message, when username is emty string', () => {
        const promise = User.create(_.assign({}, data, { username: '' }));
        return assert.isRejected(promise, /Validation error.*is required/);
    });

    it('should return user with attributes declared in `defaultScope`', () => {
        return User.create(data)
            .then(user => {
                return User.findById(user.id)
                    .then(entry => {
                        assert.deepEqual(entry.toJSON(), {
                            id: user.id,
                            username: data.username,
                            boards: [],
                        });
                    });
            });
    });

    it('should be associated to board', () => {
        return User.create(_.assign({}, data, { id: 1 }))
            .then(user => user.createBoard({ id: 1, title: 'test board' }))
            .then(() => User.findById(1))
            .then(user => {
                const _user = user.toJSON();
                assert.deepEqual(_user, {
                    id: '1',
                    username: 'testuser',
                    boards: [{
                        id: '1',
                        title: 'test board',
                        lists: []
                    }]
                });
            });
    });
});
