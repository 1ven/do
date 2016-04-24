import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { recreateTables } from '../helpers';
import db from 'server/db';
import User from 'server/models/User';

chai.use(chaiAsPromised);

describe('User model', () => {
    beforeEach(recreateTables);

    describe('register', () => {
        it('should create user', () => {
            const props = {
                username: 'test',
                email: 'test@mail.com',
                password: 123456
            };
            return User.register(props)
                .then(() => {
                    return db.one('SELECT * FROM users WHERE id = 1');
                })
                .then(user => {
                    assert.property(user, 'hash');
                    assert.property(user, 'salt');

                    delete user.hash;
                    delete user.salt;

                    assert.deepEqual(user, {
                        id: 1,
                        username: props.username,
                        email: props.email
                    });
                });
        });
    });
});
